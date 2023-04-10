import { BaseMobileApi } from '../../common/services/base-mobile-api';
import type { AuthWithCodeDto } from '@business-loyalty-program/types';
import type { TokenResponseDto } from '@flexypw/auth';
import { CreateCodeResponseDto } from '@business-loyalty-program/types';

export class AuthApiService extends BaseMobileApi {
  public async createCode(cardNumber: string): Promise<CreateCodeResponseDto> {
    try {
      return await this.client.post('/auth/code', { cardNumber });
    } catch (error) {
      console.log(error);
      const status = error?.response?.status;

      switch (status) {
        case 404:
          throw new Error('Карта не найдена');
        case 409:
          throw new Error('Повторите попытку позже');
        default:
          throw new Error('Непредвиденная ошибка');
      }
    }
  }

  public authorizeCode(body: AuthWithCodeDto): Promise<TokenResponseDto> {
    return this.client.post('/auth/code/users', body);
  }
}
