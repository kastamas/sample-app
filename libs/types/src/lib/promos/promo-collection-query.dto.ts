import { EPromoStatus } from '@business-loyalty-program/enums';
import { CollectionQueryDto } from '@flexypw/backend-core';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsEnum, IsOptional } from 'class-validator';

export class PromoCollectionQueryDto extends CollectionQueryDto {
  @ApiPropertyOptional({ enum: EPromoStatus })
  @IsOptional()
  @IsEnum(EPromoStatus)
  public status?: EPromoStatus;
}
