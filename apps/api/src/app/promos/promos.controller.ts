import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Param,
  Query,
  UseInterceptors,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { GetWithDocs, PostWithDocs, PutWithDocs } from '@flexypw/backend-core';
import { JwtSecurity } from '@flexypw/auth';
import {
  NewPromoDto,
  PromoCollectionDto,
  PromoCollectionQueryDto,
  PromoResponseDto,
  PromoUpdateDto,
} from '@business-loyalty-program/types';
import { PromosService } from './promos.service';
import { EPromoStatus } from '@business-loyalty-program/enums';

@Controller()
@ApiTags('Promo')
export class PromosController {
  constructor(private readonly promosService: PromosService) {}

  @GetWithDocs('/promos', PromoCollectionDto)
  @JwtSecurity()
  @UseInterceptors(ClassSerializerInterceptor)
  public getPromosCollection(@Query() query: PromoCollectionQueryDto) {
    return this.promosService.getCollection(query);
  }

  @PutWithDocs('/promos/:id', PromoResponseDto)
  @JwtSecurity()
  public async updatePromo(
    @Param('id') id: string,
    @Body() body: PromoUpdateDto
  ) {
    const promo = await this.promosService.getOne(id);

    return this.promosService.update(promo, body);
  }

  @PostWithDocs('/promos', PromoResponseDto)
  @JwtSecurity()
  public createPromo(@Body() body: NewPromoDto) {
    return this.promosService.create(body);
  }

  @PostWithDocs('/promos/:id/block')
  @JwtSecurity()
  public async blockPromo(@Param('id') id: string) {
    const promo = await this.promosService.getOne(id);

    await this.promosService.changeStatus(promo, EPromoStatus.Archived);
  }

  @PostWithDocs('/promos/:id/unblock')
  @JwtSecurity()
  public async unblockPromo(@Param('id') id: string) {
    const promo = await this.promosService.getOne(id);

    await this.promosService.changeStatus(promo, EPromoStatus.Active);
  }
}
