import { ApiProperty } from '@nestjs/swagger';

export class CreateCodeResponseDto {
  @ApiProperty()
  public phone: string;
}
