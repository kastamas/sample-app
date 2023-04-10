import type {
  AuthWithCodeDto,
  UsersResponseDto,
} from '@business-loyalty-program/types';
import { BranchBuilder } from '../../common/services/branch-builder';
import { AuthApiService } from './auth-api.service';
import { UsersApiService } from '../users/users-api.service';
import { storage } from '../../common/services/storage.service';

export enum EAuthState {
  Initial = 'initial',
  LoggedIn = 'logged-in',
  LoggedOut = 'logged-out',
  Unregistered = 'unregistered',
  Demo = 'demo',
}

interface IAuthBranchData {
  authState: EAuthState;
  user: UsersResponseDto | null;
}

const isRegistered = (user: UsersResponseDto) =>
  user.isRegistered ? EAuthState.LoggedIn : EAuthState.Unregistered;

const { slice: authSlice, actions: authActions } =
  new BranchBuilder<IAuthBranchData>()
    .setInitialData({
      authState: EAuthState.Initial,
      user: null,
    })
    .defineActions((api) => ({
      async checkAuth() {
        try {
          const token = storage.getString('accessToken');

          if (token) {
            const user = await api.get<UsersResponseDto>('/users/current');

            return {
              user,
              authState: isRegistered(user),
            };
          } else {
            return {
              user: null,
              authState: EAuthState.LoggedOut,
            };
          }
        } catch (error) {
          console.error(error);

          storage.delete('accessToken');

          return {
            user: null,
            authState: EAuthState.LoggedOut,
          };
        }
      },

      async setUser(user: UsersResponseDto) {
        return {
          user,
          authState: isRegistered(user),
        };
      },

      async setDemoUser(user: UsersResponseDto) {
        return {
          user,
          authState: EAuthState.Demo,
        };
      },

      async singInCode(body: AuthWithCodeDto) {
        try {
          const { accessToken } = await new AuthApiService().authorizeCode(
            body
          );

          storage.set('accessToken', accessToken);

          const user = await new UsersApiService().getCurrentUser();

          return {
            user,
            authState: isRegistered(user),
          };
        } catch (err) {
          const status = err?.response?.status;

          switch (status) {
            case 422:
              throw new Error('Неправильный код');
            case 404:
              throw new Error('Срок действия кода истек');
            case 409:
              throw new Error('Номер уже привязан');
            default:
              throw new Error('Непредвиденная ошибка');
          }
        }
      },

      async singOut() {
        try {
          storage.delete('accessToken');

          return {
            user: null,
            authState: EAuthState.LoggedOut,
          };
        } catch (error) {
          console.error(error);
          throw error;
        }
      },

      async refreshUser() {
        const user = await new UsersApiService().getCurrentUser();

        return {
          user,
          authState: EAuthState.LoggedIn,
        };
      },
    }))
    .build('auth');

export { authSlice, authActions };
