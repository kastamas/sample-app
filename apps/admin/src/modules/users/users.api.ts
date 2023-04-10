import { ApiMethod, BaseApi, buildApiHooks } from '@flexypw/react-tools';
import {
  UsersCollectionDto,
  UsersCollectionQueryDto,
  UsersResponseDto,
} from '@business-loyalty-program/types';

export class UsersApi extends BaseApi {
  @ApiMethod()
  public getCompanyUsers(
    params: UsersCollectionQueryDto
  ): Promise<UsersCollectionDto> {
    return this.client.get('/users', { params });
  }

  @ApiMethod()
  public getCompanyUser(id: string): Promise<UsersResponseDto> {
    return this.client.get(`/users/${id}`);
  }
}

const { useGetCompanyUsers, useGetCompanyUser } = buildApiHooks(UsersApi);

export { useGetCompanyUsers, useGetCompanyUser };
