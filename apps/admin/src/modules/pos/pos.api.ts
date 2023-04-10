import { ApiMethod, BaseApi, buildApiHooks } from '@flexypw/react-tools';
import {
  PosCollectionDto,
  PosCollectionQueryDto,
} from '@business-loyalty-program/types';

export class POSApi extends BaseApi {
  @ApiMethod()
  public getCompanyPOS(
    params: PosCollectionQueryDto
  ): Promise<PosCollectionDto> {
    return this.client.get('/pos', { params });
  }
}

const { useGetCompanyPOS } = buildApiHooks(POSApi);

export { useGetCompanyPOS };
