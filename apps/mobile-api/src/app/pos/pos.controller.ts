import { Controller } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { PosService } from './pos.service';
import { GetWithDocs } from '@flexypw/backend-core';
import { PosResponseDto } from '@business-loyalty-program/types';

@Controller()
@ApiTags('POS')
export class PosController {
  constructor(private readonly posService: PosService) {}

  @GetWithDocs('/pos', PosResponseDto, true)
  public async getCollection() {
    const [list] = await this.posService.getList();

    return list;
  }
}
