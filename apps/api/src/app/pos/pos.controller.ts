import { ApiTags } from '@nestjs/swagger';
import { Controller, Query } from '@nestjs/common';
import { GetWithDocs } from '@flexypw/backend-core';
import { JwtSecurity } from '@flexypw/auth';
import {
  PosCollectionDto,
  PosCollectionQueryDto,
} from '@business-loyalty-program/types';
import { PosService } from './pos.service';

@Controller()
@ApiTags('POS')
export class PosController {
  constructor(private posService: PosService) {}

  @GetWithDocs('/pos', PosCollectionDto)
  @JwtSecurity()
  public getCollection(@Query() query: PosCollectionQueryDto) {
    return this.posService.getList(query);
  }
}
