import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsArray, IsOptional } from 'class-validator';

export class PromoUpdateDto {
  @ApiPropertyOptional()
  @IsOptional()
  public imageId: string;

  @ApiPropertyOptional()
  @IsOptional()
  public name: string;

  @ApiPropertyOptional()
  @IsOptional()
  public description: string;

  @ApiPropertyOptional()
  @IsOptional()
  public summary: string;

  @ApiPropertyOptional({ type: [String] })
  @IsOptional()
  @IsArray()
  public posIds: string[];
}
