import {
  IsDateString,
  IsNumber,
  IsNotEmpty,
  IsOptional,
} from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class UserSyncDto {
  @ApiPropertyOptional()
  @IsOptional()
  public cardNumber: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsDateString()
  public createdAt?: string;

  @ApiPropertyOptional()
  @IsOptional()
  public name?: string;

  @ApiPropertyOptional()
  @IsOptional()
  public surname?: string;

  @ApiPropertyOptional()
  @IsOptional()
  public phone: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsNumber()
  public bonusAmount: number;

  @ApiPropertyOptional()
  @IsOptional()
  public corporateCardNumber: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsNumber()
  public corporateBonusAmount: number;
}
