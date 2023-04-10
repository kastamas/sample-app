import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { EUserGender } from '@business-loyalty-program/enums';
import { PosResponseDto } from '../pos/pos-response.dto';
import { BaseEntityDto } from '@flexypw/database';
import { CitiesResponseDto } from '../cities/cities-response.dto';
import { FileResponseDto } from '@flexypw/files-core';

export class NotificationsResponseDto extends BaseEntityDto {
  @ApiProperty()
  public date: string;

  @ApiPropertyOptional({ enum: EUserGender })
  public gender?: EUserGender;

  @ApiProperty()
  public text: string;

  @ApiProperty({ type: [PosResponseDto] })
  public pos: PosResponseDto[];

  @ApiProperty({ type: [CitiesResponseDto] })
  public cities: CitiesResponseDto[];

  @ApiPropertyOptional()
  public image?: FileResponseDto;
}
