import React, { FC, useEffect, useState } from 'react';
import { RefreshControl, SafeAreaView, StatusBar, View } from 'react-native';
import styled from 'styled-components/native';

import {
  CitiesResponseDto,
  PosResponseDto,
} from '@business-loyalty-program/types';

import { EApplicationScreens } from '../screens';
import { TTabProps } from '../navigation/types';
import { useAppDispatch, useAppSelector } from '../store/hooks';

import { Select } from '../common/components/buttons/select';
import { TouchableBackground } from '../common/components/modal/components/touchable-background';

import { authActions, EAuthState } from '../modules/auth/auth.branch';
import { configActions } from '../modules/config/config.branch';
import { UsersApiService } from '../modules/users/users-api.service';
import { UserAvatarEdit } from '../modules/users/components/user-avatar-edit';
import { SignOutButton } from '../modules/users/components/signout-button';
import { UserInfoItem } from '../modules/users/components/user-info-item';
import { CitiesRadioModal } from '../modules/cities/components/cities-radio-modal';
import { getSelectedCity } from '../modules/cities/cities.helpers';
import { PosCheckboxModal } from '../modules/pos/components/pos-checkbox-modal';
import { getSelectedPos } from '../modules/pos/pos.helpers';
import { CardFormat, formatCardNumber } from '../modules/users/users.helpers';
import moment from 'moment';
import { EUserGender } from '@business-loyalty-program/enums';
import {
  cond,
  constant,
  flow,
  get,
  isEqual,
  stubTrue as otherwise,
} from 'lodash/fp';
import { useToast } from 'react-native-toast-notifications';
import { showToast } from '../common/utils';
import { citiesActions } from '../modules/cities/cities.branch';

const usersApi = new UsersApiService();

const Wrapper = styled.ScrollView`
  height: 100%;
  padding: 16px 24px;
  padding-top: 24px;
`;

const Name = styled.Text`
  margin-top: 24px;
  color: rgba(0, 0, 0, 0.9);
  font-family: 'Rubik';
  font-style: normal;
  font-weight: 400;
  font-size: 26px;
  line-height: 31px;
  display: flex;
`;

const Information = styled(UserInfoItem)`
  margin-top: 12px;
`;

const StyledSignOutButton = styled(SignOutButton)`
  margin-top: 40px;
  margin-bottom: 40px;
`;

const TwoColumnWrapper = styled.View`
  display: flex;
  flex-direction: row;
`;

const getGender = cond([
  [flow(get('gender'), isEqual(EUserGender.Male)), constant('Мужской')],
  [flow(get('gender'), isEqual(EUserGender.Female)), constant('Женский')],
  [otherwise, constant('—')],
]);

export const ProfileScreen: FC<TTabProps<EApplicationScreens.Profile>> = ({
  navigation,
}) => {
  const dispatch = useAppDispatch();
  const toast = useToast();

  const user = useAppSelector((state) => state.auth.data.user);
  const authState = useAppSelector((state) => state.auth.data.authState);

  const { loading } = useAppSelector((state) => ({
    loading: state.auth.loading,
  }));

  const [visible, setVisible] = useState({
    citiesModal: false,
    posModal: false,
  });

  useEffect(() => {
    dispatch(citiesActions.getCitiesList());
  }, []);

  useEffect(() => {
    dispatch(
      configActions.changeTabsVisibility(
        ![visible.citiesModal, visible.posModal].some(Boolean)
      )
    );
  }, [visible.citiesModal, visible.posModal]);

  const saveAvatar = (data: any) =>
    usersApi.updateCurrentUser(data).then((updatedUser) => {
      dispatch(authActions.setUser(updatedUser));
    });

  const saveCity = (city?: CitiesResponseDto) => {
    if (city)
      usersApi
        .updateCurrentUser({ cityId: city.id })
        .then((updatedUser) => {
          dispatch(authActions.setUser(updatedUser));
        })
        .then(toggleCitiesModal);
  };

  const savePos = (selected: PosResponseDto[]) =>
    usersApi
      .updateCurrentUser({
        favouritePosIds: selected.map((option) => option.id),
      })
      .then((updatedUser) => {
        dispatch(authActions.setUser(updatedUser));
      })
      .then(togglePosModal);

  const toggleCitiesModal = () => {
    if (authState === EAuthState.Demo) {
      showToast(toast, 'В демо-режиме выбор города недоступен');
      return;
    }

    setVisible((previous) => ({
      ...previous,
      citiesModal: !previous.citiesModal,
    }));
  };

  const togglePosModal = () => {
    if (authState === EAuthState.Demo) {
      showToast(toast, 'В демо-режиме выбор любимых магазинов недоступен');
      return;
    }

    setVisible((previous) => ({
      ...previous,
      posModal: !previous.posModal,
    }));
  };

  function updateData() {
    dispatch(authActions.refreshUser());
  }

  const closeModals = () => setVisible({ citiesModal: false, posModal: false });

  if (!user) return null;

  return (
    <SafeAreaView style={{ backgroundColor: '#fff' }}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />

      <Wrapper
        refreshControl={
          <RefreshControl refreshing={loading} onRefresh={() => updateData()} />
        }
      >
        {user && <UserAvatarEdit user={user} onSubmit={saveAvatar} />}

        <Name>
          {user.name} {user.surname}
        </Name>

        <Select
          label="Город"
          value={user.city?.id}
          onPress={toggleCitiesModal}
          style={{ marginTop: 12 }}
        >
          {getSelectedCity(user.city)}
        </Select>

        <Select
          label="Любимые магазины"
          value={user.favouritePos?.length}
          onPress={togglePosModal}
          style={{ marginTop: 12 }}
        >
          {getSelectedPos(user.favouritePos)}
        </Select>

        <TwoColumnWrapper>
          <Information title="Дата рождения">
            {user.dateOfBirth
              ? moment(user.dateOfBirth).format('YYYY-MM-DD')
              : '—'}
          </Information>

          <Information style={{ marginLeft: 32 }} title="Пол">
            {getGender(user)}
          </Information>
        </TwoColumnWrapper>

        {user.email ? (
          <Information title="Почта">{user.email}</Information>
        ) : null}

        <Information title="Номер бонусной карты">
          {formatCardNumber(user.cardNumber, CardFormat.Standard)}
        </Information>

        {Boolean(user.corporateCardNumber) && (
          <Information title="Корпоративная карта">
            {formatCardNumber(user.corporateCardNumber, CardFormat.Corporate)}
          </Information>
        )}

        <StyledSignOutButton />
      </Wrapper>

      {[visible.citiesModal, visible.posModal].some(Boolean) && (
        <TouchableBackground onPress={closeModals} />
      )}

      {visible.citiesModal && (
        <CitiesRadioModal onSave={saveCity} value={user?.city} />
      )}

      {visible.posModal && <PosCheckboxModal onSave={savePos} />}
    </SafeAreaView>
  );
};
