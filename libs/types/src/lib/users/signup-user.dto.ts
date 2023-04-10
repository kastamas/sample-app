import { EUserGender } from '@business-loyalty-program/enums';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsEnum,
  IsEmail,
  IsBoolean,
  IsOptional,
} from 'class-validator';

export class SignupUserDto {
  @ApiProperty()
  @IsNotEmpty()
  public cityId: string;

  @ApiProperty()
  @IsNotEmpty()
  public name: string;

  @ApiProperty()
  @IsNotEmpty()
  public surname: string;

  @ApiProperty()
  @IsNotEmpty()
  public patronymic: string;

  @ApiPropertyOptional({ format: 'date' })
  @IsOptional()
  public dateOfBirth?: string;

  @ApiPropertyOptional({ enum: EUserGender })
  @IsOptional()
  @IsEnum(EUserGender)
  public gender?: EUserGender;

  @ApiProperty({ format: 'email' })
  @IsNotEmpty()
  @IsEmail()
  public email: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsBoolean()
  public is18: boolean;

  @ApiProperty()
  @IsOptional()
  public favouritePosIds: string[];

  @ApiPropertyOptional()
  @IsOptional()
  public referralFrom?: string;
}
