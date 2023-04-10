import { ApiMethod, BaseApi, buildApiHooks } from '@flexypw/react-tools';
import {
  PromoCollectionDto,
  PromoCollectionQueryDto,
  NewPromoDto,
  PromoUpdateDto,
  PromoResponseDto,
} from '@business-loyalty-program/types';
import { EPromoStatus } from '@business-loyalty-program/enums';
import { v4 } from 'uuid';

export class PromosApi extends BaseApi {
  @ApiMethod()
  public getPromos(
    params: PromoCollectionQueryDto
  ): Promise<PromoCollectionDto> {
    return this.client.get('/promos', { params });
  }

  @ApiMethod()
  public createPromo(body: NewPromoDto): Promise<PromoResponseDto> {
    return this.client.post('/promos', body);
  }

  @ApiMethod()
  public updatePromo(
    id: string,
    body: PromoUpdateDto
  ): Promise<PromoResponseDto> {
    return this.client.put(`/promos/${id}`, body);
  }

  @ApiMethod()
  public async changePromoStatus(id: string, status: EPromoStatus) {
    if (status === EPromoStatus.Active) {
      await this.client.post(`/promos/${id}/unblock`);
    } else {
      await this.client.post(`/promos/${id}/block`);
    }

    return v4();
  }
}

const {
  useGetPromos,
  useChangePromoStatus,
  useUpdatePromo,
  useCreatePromo,
  useSetTokenFromResponse,
} = buildApiHooks(PromosApi);

export {
  useGetPromos,
  useChangePromoStatus,
  useUpdatePromo,
  useCreatePromo,
  useSetTokenFromResponse,
};
