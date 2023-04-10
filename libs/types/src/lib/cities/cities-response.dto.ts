import { BaseEntityDto } from '@flexypw/database';
import { ApiProperty } from '@nestjs/swagger';

export class CitiesResponseDto extends BaseEntityDto {
  @ApiProperty()
  public name: string;
}
