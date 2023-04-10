import { BaseMobileApi } from '../../common/services/base-mobile-api';
import type {
  SignupUserDto,
  UsersResponseDto,
  UserUpdateMobileDto,
} from '@business-loyalty-program/types';

export class UsersApiService extends BaseMobileApi {
  public registerCurrentUser(body: SignupUserDto): Promise<UsersResponseDto> {
    return this.client.put('/users/current/signup', body);
  }

  public getCurrentUser(): Promise<UsersResponseDto> {
    return this.client.get('/users/current');
  }

  public updateCurrentUser(
    body: UserUpdateMobileDto
  ): Promise<UsersResponseDto> {
    return this.client.put('/users/current', body);
  }

  public removeUser(): Promise<void> {
    return this.client.post('/users/current/signout');
  }
}
