import { BaseMobileApi } from '../../common/services/base-mobile-api';
import { CitiesResponseDto } from '@business-loyalty-program/types';

export class CitiesApiService extends BaseMobileApi {
  public getCitiesList(): Promise<CitiesResponseDto[]> {
    return this.client.get('/cities');
  }
}
