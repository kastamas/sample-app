import React from 'react';
import { useAppDispatch, useAppSelector } from '../../../store/hooks';
import styled from 'styled-components/native';
import { RefreshControl, TouchableOpacity } from 'react-native';
import { posActions } from '../pos.branch';
import { LocationService } from '../../../common/services/location-service';
import { PosResponseDto } from '@business-loyalty-program/types';
import Ionicons from 'react-native-vector-icons/Entypo';
import _ from 'lodash';
import { authActions, EAuthState } from '../../auth/auth.branch';
import { UsersApiService } from '../../users/users-api.service';
import { useToast } from 'react-native-toast-notifications';
import { showToast } from '../../../common/utils';
import { selectPos } from '../pos.store';

const usersApi = new UsersApiService();

const Wrapper = styled.ScrollView`
  padding: 28px 24px;
`;

const ListItem = styled.View`
  padding: 16px 0;
  display: flex;
  flex-direction: row;
  border-bottom-color: #dae0ed;
  border-bottom-width: 1px;
`;

const InfoWrapper = styled(TouchableOpacity)``;

const Title = styled.Text`
  font-family: 'Rubik';
  font-style: normal;
  font-weight: 400;
  font-size: 12px;
  line-height: 14px;
  color: rgba(0, 0, 0, 0.5);
`;

const TitleContent = styled.View`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-bottom: 5px;
`;

const Address = styled.Text`
  max-width: 300px;
  font-family: 'Rubik';
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 19px;
  color: rgba(0, 0, 0, 0.9);
`;

const Distance = styled.Text`
  font-family: 'Rubik';
  font-style: normal;
  font-weight: 400;
  font-size: 12px;
  line-height: 14px;
  color: rgba(0, 0, 0, 0.9);
  margin-left: 6px;
`;

const IconWrapper = styled(TouchableOpacity)`
  width: 31px;
  height: 31px;
  background-color: transparent;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  border-radius: 6px;
  margin-left: auto;
`;

interface IComponentProps {
  isPublic: boolean;
  jumpTo: (key: string) => void;
}

export const PosList: React.FC<IComponentProps> = ({ isPublic, jumpTo }) => {
  const { items, loading } = useAppSelector((state) => ({
    items: state.pos.data.filtered,
    loading: state.pos.loading,
  }));
  const location = useAppSelector((state) => state.location.data);
  const user = useAppSelector((state) => state.auth.data.user);
  const authState = useAppSelector((state) => state.auth.data.authState);

  const dispatch = useAppDispatch();
  const toast = useToast();

  const userFavoritePosIds = _.map(user?.favouritePos, 'id');

  const isSelected = (item: PosResponseDto) =>
    userFavoritePosIds.includes(item.id);

  const savePos = (selected: PosResponseDto) => {
    if (authState === EAuthState.Demo) {
      showToast(toast, 'Действие невозможно в режиме демонстрации');
      return;
    }

    if (isPublic) {
      showToast(
        toast,
        'Действие доступно только для зарегистрированных пользователей'
      );
      return;
    }

    usersApi
      .updateCurrentUser({
        favouritePosIds: _.xor(userFavoritePosIds, [selected.id]),
      })
      .then((updatedUser) => {
        dispatch(authActions.setUser(updatedUser));
      });
  };

  return (
    <>
      <Wrapper
        keyboardShouldPersistTaps="handled"
        refreshControl={
          <RefreshControl
            refreshing={loading}
            onRefresh={() => dispatch(posActions.getPosList())}
          />
        }
      >
        {items.map((item) => (
          <ListItem key={item.id}>
            <InfoWrapper
              activeOpacity={0.5}
              onPress={() => {
                jumpTo('map');
                setTimeout(() => dispatch(selectPos(item)), 500);
              }}
            >
              <TitleContent>
                <Title>{item.name}</Title>
                {location ? (
                  <Distance>
                    {new LocationService(location).calculateDistance(
                      item.coords
                    )}
                  </Distance>
                ) : null}
              </TitleContent>

              <Address>{item.address}</Address>
            </InfoWrapper>

            <IconWrapper activeOpacity={0.5} onPress={() => savePos(item)}>
              <Ionicons
                name="heart"
                color={isSelected(item) ? '#D7493B' : '#D8D8D8'}
                size={31}
              />
            </IconWrapper>
          </ListItem>
        ))}
      </Wrapper>
    </>
  );
};
