import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional } from 'class-validator';

export class UserUpdateMobileDto {
  @ApiPropertyOptional()
  @IsOptional()
  public imageId?: string;

  @ApiPropertyOptional()
  @IsOptional()
  public cityId?: string;

  @ApiPropertyOptional()
  @IsOptional()
  public favouritePosIds?: string[];
}
