import { Body, Controller, ParseArrayPipe } from '@nestjs/common';
import { PostWithDocs } from '@flexypw/backend-core';
import { IntegrationSecurity } from '../../common/guards/integration-auth.guard';
import { PosRepository } from '@business-loyalty-program/database';
import { ApiBody } from '@nestjs/swagger';
import { PosSyncDto } from '@business-loyalty-program/types';

@Controller()
export class PosController {
  constructor(private readonly posRepository: PosRepository) {}

  @PostWithDocs('/pos')
  @IntegrationSecurity()
  @ApiBody({ type: [PosSyncDto] })
  public async getUser(
    @Body(new ParseArrayPipe({ items: PosSyncDto })) body: PosSyncDto[]
  ) {
    await this.posRepository.bulkUpsert(body);
  }
}
