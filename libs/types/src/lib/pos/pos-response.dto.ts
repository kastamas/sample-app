import { BaseEntityDto } from '@flexypw/database';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class PosResponseDto extends BaseEntityDto {
  @ApiProperty()
  public name: string;

  @ApiProperty()
  public address: string;

  @ApiProperty({ type: [Number] })
  public coords: number[];

  @ApiPropertyOptional()
  public note?: string;

  @ApiPropertyOptional()
  public phone?: string;

  @ApiPropertyOptional()
  public externalId?: string;
}
