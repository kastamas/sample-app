import { BaseMobileApi } from '../../common/services/base-mobile-api';
import type { PosResponseDto } from '@business-loyalty-program/types';

export class PosApiService extends BaseMobileApi {
  public getPosList(): Promise<PosResponseDto[]> {
    return this.client.get('/pos');
  }
}
