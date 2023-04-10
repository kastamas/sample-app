import { ApiProperty } from '@nestjs/swagger';
import { FileResponseDto } from '@flexypw/files-core';
import { EPromoStatus } from '@business-loyalty-program/enums';
import { BaseEntityDto } from '@flexypw/database';
import { PosResponseDto } from '../pos/pos-response.dto';

export class PromoResponseDto extends BaseEntityDto {
  @ApiProperty()
  public image: FileResponseDto;

  @ApiProperty()
  public name: string;

  @ApiProperty()
  public description: string;

  @ApiProperty()
  public summary: string;

  @ApiProperty({ enum: EPromoStatus })
  public status: EPromoStatus;

  @ApiProperty({ type: [PosResponseDto] })
  public pos: PosResponseDto[];
}
