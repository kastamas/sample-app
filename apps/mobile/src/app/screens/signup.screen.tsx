import React, { FC, useEffect, useState } from 'react';
import { GestureResponderEvent, StatusBar, View } from 'react-native';
import styled from 'styled-components/native';

import { SignupUserDto } from '@business-loyalty-program/types';
import { EUserGender } from '@business-loyalty-program/enums';

import { useAppDispatch, useAppSelector } from '../store/hooks';

import { DatePicker } from '../common/components/form-controls/date-picker';
import { Input } from '../common/components/form-controls/input';
import { RadioPicker } from '../common/components/form-controls/radio-picker';
import { Checkbox } from '../common/components/form-controls/checkbox';
import { Select } from '../common/components/buttons/select';
import { PrimaryButton } from '../common/components/buttons/primary';
import { TouchableBackground } from '../common/components/modal/components/touchable-background';

import {
  formatDateOfBirth,
  TextError,
} from '../common/components/form-controls/helpers';
import { authActions } from '../modules/auth/auth.branch';
import { UsersApiService } from '../modules/users/users-api.service';
import { CitiesRadioModal } from '../modules/cities/components/cities-radio-modal';
import { getSelectedCity } from '../modules/cities/cities.helpers';

import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { EApplicationScreens } from '../screens';

import { TScreenProps } from '../navigation/types';
import { citiesActions } from '../modules/cities/cities.branch';
import { posActions } from '../modules/pos/pos.branch';
import { BackHeader } from '../common/components/BackHeader';

const format = {
  dateOfBirth: /[0-9]{2}\.[0-9]{2}\.[0-9]{4}/,
  email: /.+@.+\..+/,
};

const requiredPrimitives: Exclude<
  keyof SignupUserDto,
  'gender' | 'favouritePosIds' | 'referralFrom' | 'dateOfBirth'
>[] = ['cityId', 'name', 'surname', 'patronymic', 'email', 'is18'];

const requiredComplexes: Extract<
  keyof SignupUserDto,
  'dateOfBirth' | 'email'
>[] = ['dateOfBirth', 'email'];

const usersApi = new UsersApiService();

const SafeAreaView = styled.SafeAreaView`
  background-color: #f3f4f8;
`;

const ScrollView = styled.ScrollView`
  padding: 0 16px;
  min-height: 100%;
`;

export const SignupScreen: FC<TScreenProps<EApplicationScreens.SignUp>> = ({
  navigation,
  route,
}) => {
  const isDemo = route.params?.isDemo;

  const user = useAppSelector((state) => state.auth.data.user);

  const dispatch = useAppDispatch();

  const [formFilled, setFormFilled] = useState(false);

  const [data, setData] = useState<SignupUserDto>({
    cityId: undefined,
    name: undefined,
    surname: undefined,
    patronymic: undefined,
    dateOfBirth: undefined,
    gender: undefined,
    favouritePosIds: undefined,
    email: undefined,
    is18: false,
    referralFrom: undefined,
  });

  const [selectedCity, setSelectedCity] = useState(null);

  const [visible, setVisible] = useState({
    citiesModal: false,
  });

  useEffect(() => {
    dispatch(citiesActions.getCitiesList());
    dispatch(posActions.getPosList());
  }, []);

  useEffect(() => {
    if (isDemo) {
      const date = new Date();

      setData((prevState) => ({
        ...prevState,
        name: 'Иван',
        surname: 'Иванов',
        patronymic: 'Иванович',
        dateOfBirth: '01.01.1990',
        email: 'test@user.com',
        id: '1',
        gender: EUserGender.Male,
        cardNumber: '978020137962',
        phone: '89991009090',
        bonusAmount: 99,
        image: undefined,
        corporateBonusAmount: 109,
        createdAt: date.toString() as unknown as Date,
        updatedAt: date.toString() as unknown as Date,
        corporateCardNumber: '978020137962',
        is18: false,
        favouritePosIds: [],
      }));
    }
  }, [isDemo]);

  useEffect(() => {
    const primitivesChecked = requiredPrimitives
      .map((field) => data[field])
      .every(Boolean);

    const complexesChecked = requiredComplexes
      .map((name) => [data[name], format[name]] as const)
      .map(([value, rule]) => [value ?? '', rule] as const)
      .map(([value, rule]) => rule.test(value))
      .every(Boolean);

    setFormFilled(primitivesChecked && complexesChecked);
  }, [data]);

  useEffect(() => {
    if (selectedCity) {
      patchState(`cityId`)(selectedCity.id);
      toggleCitiesModal();
    }
  }, [selectedCity]);

  const patchState =
    <Field extends keyof SignupUserDto>(field: Field) =>
    (value: SignupUserDto[Field]) =>
      setData((previous) => ({ ...previous, [field]: value }));

  const registerUser = (event: GestureResponderEvent) => {
    if (isDemo) {
      return dispatch(
        authActions.setDemoUser({
          ...user,
          ...data,
          isRegistered: true,
          dateOfBirth: data.dateOfBirth
            ? formatDateOfBirth(data.dateOfBirth)
            : undefined,
        })
      );
    }

    usersApi
      .registerCurrentUser({
        ...data,
        dateOfBirth: data.dateOfBirth
          ? formatDateOfBirth(data.dateOfBirth)
          : undefined,
      })
      .then((updatedUser) => {
        dispatch(authActions.setUser(updatedUser));
      });
  };

  const toggleCitiesModal = () =>
    setVisible((previous) => ({
      ...previous,
      citiesModal: !previous.citiesModal,
    }));

  const closeModals = () => setVisible({ citiesModal: false });

  const goBack = () => {
    isDemo
      ? navigation.navigate(EApplicationScreens.Auth)
      : navigation.navigate(EApplicationScreens.PhoneCodeValidation);
  };

  return (
    <SafeAreaView style={{ backgroundColor: '#FFFFFF' }}>
      <KeyboardAwareScrollView>
        <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />

        <View
          style={{
            marginTop: 40,
            marginBottom: 40,
            backgroundColor: '#FFFFFF',
          }}
        >
          <ScrollView>
            <BackHeader onPress={goBack} title={'Регистрация'} />

            <Select
              label="Город"
              value={data.cityId}
              onPress={toggleCitiesModal}
              required
              style={{ marginBottom: 12 }}
            >
              {getSelectedCity(selectedCity)}
            </Select>

            <Input
              label="Фамилия"
              value={data.surname}
              onChange={patchState('surname')}
              required
              style={{ marginBottom: 12 }}
            />

            <Input
              label="Имя"
              value={data.name}
              onChange={patchState('name')}
              required
              style={{ marginBottom: 12 }}
            />

            <Input
              label="Отчество"
              value={data.patronymic}
              onChange={patchState('patronymic')}
              required
              style={{ marginBottom: 12 }}
            />

            <DatePicker
              required
              label="Дата рождения"
              value={data.dateOfBirth}
              format={format.dateOfBirth}
              formatMessage="дд.мм.гггг"
              onChange={patchState('dateOfBirth')}
              style={{ marginBottom: 26 }}
            />

            <Input
              label="Почта"
              value={data.email}
              format={format.email}
              formatMessage="test@test.test"
              placeholder="example@gmail.ru"
              onChange={patchState('email')}
              required
              style={{ marginBottom: 26 }}
              autoCapitalize="none"
            />

            <Input
              label="Промокод «Приведи друга» (если есть)"
              value={data.referralFrom}
              onChange={patchState('referralFrom')}
              style={{ marginBottom: 32 }}
            />

            <RadioPicker
              items={[
                { label: 'Мужской', value: EUserGender.Male },
                { label: 'Женский', value: EUserGender.Female },
              ]}
              value={data.gender}
              onChange={patchState('gender')}
              style={{ marginBottom: 12 }}
            />

            <Checkbox
              label="Мне есть 18"
              value={data.is18}
              onChange={patchState('is18')}
              required
              style={{ marginBottom: 26 }}
            />

            <PrimaryButton
              disabled={!formFilled}
              onPress={registerUser}
              style={{ marginBottom: 6 }}
            >
              Зарегистрироваться
            </PrimaryButton>

            {!formFilled && (
              <TextError style={{ textAlign: 'center' }}>
                Не все поля заполнены!
              </TextError>
            )}
          </ScrollView>
        </View>
      </KeyboardAwareScrollView>

      {[visible.citiesModal].some(Boolean) && (
        <TouchableBackground onPress={closeModals} />
      )}

      {visible.citiesModal && (
        <CitiesRadioModal onSave={setSelectedCity} value={selectedCity} />
      )}
    </SafeAreaView>
  );
};
