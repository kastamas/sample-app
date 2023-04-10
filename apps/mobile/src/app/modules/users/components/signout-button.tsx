import React, { FC } from 'react';
import { View, StyleProp, ViewStyle, Alert } from 'react-native';
import styled from 'styled-components/native';

import { useAppDispatch, useAppSelector } from '../../../store/hooks';
import { authActions, EAuthState } from '../../auth/auth.branch';
import { UsersApiService } from '../users-api.service';

interface IComponentProps {
  style?: StyleProp<ViewStyle>;
}

const Wrapper = styled.TouchableHighlight`
  padding: 12px;
  width: 100%;

  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;

  background-color: rgba(218, 224, 237, 0.6);
  border-radius: 4px;
`;

const DeleteButtonWrapper = styled.TouchableHighlight`
  margin-top: 16px;
  padding: 12px;
  width: 100%;

  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;

  background-color: rgb(255, 0, 0, 0.47);
  border-radius: 4px;
`;

const Text = styled.Text`
  color: #858ea3;
  font-size: 14px;
`;

export const SignOutButton: FC<IComponentProps> = ({ style }) => {
  const dispatch = useAppDispatch();
  const authState = useAppSelector((state) => state.auth.data.authState);

  const buttonText =
    authState === EAuthState.Demo
      ? 'Завершить демонстрацию'
      : 'Выйти из приложения';

  const removeRegistration = () => {
    new UsersApiService().removeUser().then(logout).catch(console.log);
  };

  const logout = () => {
    dispatch(authActions.singOut());
  };

  return (
    <View style={style}>
      <Wrapper
        activeOpacity={0.7}
        underlayColor="rgba(167, 163, 163, 0.32)"
        onPress={logout}
      >
        <Text>{buttonText}</Text>
      </Wrapper>

      <DeleteButtonWrapper
        activeOpacity={0.7}
        underlayColor="rgb(255, 0, 0, 0.47)"
        onPress={() =>
          Alert.alert(
            'Удалить аккаунт?',
            'Ваши баллы сохранятся, персональная информация будет удалена.',
            [
              {
                text: 'Отмена',
                onPress: () => console.log('Cancel Pressed'),
                style: 'cancel',
              },
              {
                text: 'Удалить',
                onPress:
                  authState === EAuthState.Demo ? logout : removeRegistration,
                style: 'destructive',
              },
            ]
          )
        }
      >
        <Text>Удалить аккаунт</Text>
      </DeleteButtonWrapper>
    </View>
  );
};
