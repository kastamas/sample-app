import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsArray, IsNotEmpty, IsOptional } from 'class-validator';

export class NewPromoDto {
  @ApiProperty()
  @IsNotEmpty()
  public imageId: string;

  @ApiProperty()
  @IsNotEmpty()
  public name: string;

  @ApiProperty()
  @IsNotEmpty()
  public description: string;

  @ApiProperty()
  @IsNotEmpty()
  public summary: string;

  @ApiPropertyOptional({ type: [String] })
  @IsOptional()
  @IsArray()
  public posIds: string[];
}
