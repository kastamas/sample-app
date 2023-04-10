import { BaseEntityDto } from '@flexypw/database';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { FileResponseDto } from '@flexypw/files-core';
import { EUserGender } from '@business-loyalty-program/enums';
import { CitiesResponseDto } from '../cities/cities-response.dto';
import { PosResponseDto } from '../pos/pos-response.dto';

export class UsersResponseDto extends BaseEntityDto {
  @ApiProperty()
  public name: string;

  @ApiPropertyOptional()
  public surname?: string;

  @ApiPropertyOptional()
  public phone?: string;

  @ApiPropertyOptional()
  public cardNumber?: string;

  @ApiPropertyOptional()
  public image?: FileResponseDto;

  @ApiPropertyOptional()
  public corporateCardNumber: string;

  @ApiProperty()
  public corporateBonusAmount: number;

  @ApiProperty()
  public bonusAmount: number;

  @ApiProperty()
  public isRegistered: boolean;

  @ApiPropertyOptional()
  public city?: CitiesResponseDto;

  @ApiPropertyOptional()
  public patronymic?: string;

  @ApiPropertyOptional()
  public dateOfBirth?: string;

  @ApiPropertyOptional({
    enum: EUserGender,
  })
  public gender?: EUserGender;

  @ApiPropertyOptional({ format: 'email' })
  public email?: string;

  @ApiPropertyOptional()
  public is18?: boolean;

  @ApiPropertyOptional()
  public referralCode?: string;

  @ApiProperty({ type: [PosResponseDto] })
  public favouritePos: PosResponseDto[];
}
