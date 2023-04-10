import { BaseCollection } from '@flexypw/backend-core';
import { ApiProperty } from '@nestjs/swagger';
import { PromoResponseDto } from './promo-response.dto';

export class PromoCollectionDto extends BaseCollection<PromoResponseDto> {
  @ApiProperty({ type: [PromoResponseDto] })
  public data: PromoResponseDto[];
}
