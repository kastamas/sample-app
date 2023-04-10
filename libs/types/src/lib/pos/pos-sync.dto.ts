import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  ArrayMaxSize,
  ArrayMinSize,
  IsArray,
  IsDateString,
  IsNotEmpty,
  IsNumber,
  IsOptional,
} from 'class-validator';

export class PosSyncDto {
  @ApiPropertyOptional()
  @IsOptional()
  @IsDateString()
  public createdAt: Date;

  @ApiProperty()
  @IsNotEmpty()
  public name: string;

  @ApiProperty()
  @IsNotEmpty()
  public address: string;

  @ApiProperty({ type: [Number] })
  @IsNotEmpty()
  @IsArray()
  @ArrayMinSize(2)
  @ArrayMaxSize(2)
  @IsNumber({}, { each: true })
  public coords: number[];

  @ApiPropertyOptional()
  @IsOptional()
  public note?: string;

  @ApiPropertyOptional()
  @IsOptional()
  public phone?: string;

  @ApiProperty()
  @IsNotEmpty()
  public externalId: string;
}
