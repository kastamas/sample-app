import { EBonusSyncOutStatus } from '@business-loyalty-program/enums';
import { ApiProperty } from '@nestjs/swagger';
import { BaseEntityDto } from '@flexypw/database';

export class BonusSyncOutResponseDto extends BaseEntityDto {
  @ApiProperty()
  public bonusChange: number;

  @ApiProperty()
  public cardNumber: string;

  @ApiProperty({ enum: EBonusSyncOutStatus })
  public status: EBonusSyncOutStatus;
}
