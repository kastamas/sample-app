import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  ArrayNotEmpty,
  IsArray,
  IsDateString,
  IsEnum,
  IsNotEmpty,
  IsOptional,
} from 'class-validator';
import { EUserGender } from '@business-loyalty-program/enums';

export class NewNotificationDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsDateString()
  public date: string;

  @ApiPropertyOptional({ enum: EUserGender })
  @IsOptional()
  @IsEnum(EUserGender)
  public gender?: EUserGender;

  @ApiProperty()
  @IsNotEmpty()
  public text: string;

  @ApiProperty({ type: [String] })
  @IsNotEmpty()
  @IsArray()
  @ArrayNotEmpty()
  public posIds: string[];

  @ApiProperty({ type: [String] })
  @IsNotEmpty()
  @IsArray()
  @ArrayNotEmpty()
  public cityIds: string[];

  @ApiPropertyOptional()
  @IsOptional()
  public imageId?: string;
}
