import { Controller } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { GetWithDocs } from '@flexypw/backend-core';
import { PromoCollectionDto } from '@business-loyalty-program/types';
import { PromosService } from './promos.service';
import { EPromoStatus } from '@business-loyalty-program/enums';

@Controller()
@ApiTags('Promo')
export class PromosController {
  constructor(private readonly promosService: PromosService) {}

  @GetWithDocs('/promos', PromoCollectionDto)
  public getPromosCollection() {
    return this.promosService.getCollection({
      limit: 10000,
      status: EPromoStatus.Active,
    });
  }
}
