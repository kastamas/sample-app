import { BaseMobileApi } from '../../common/services/base-mobile-api';
import { PromoCollectionDto } from '@business-loyalty-program/types';

export class PromoApiService extends BaseMobileApi {
  public getPromoList(): Promise<PromoCollectionDto> {
    return this.client.get('/promos');
  }
}
