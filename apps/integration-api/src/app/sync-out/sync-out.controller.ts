import { Body, Controller, ParseArrayPipe } from '@nestjs/common';
import { GetWithDocs, PostWithDocs } from '@flexypw/backend-core';
import { IntegrationSecurity } from '../../common/guards/integration-auth.guard';
import { BonusSyncOutRepository } from '@business-loyalty-program/database';
import { ApiBody } from '@nestjs/swagger';
import { EBonusSyncOutStatus } from '@business-loyalty-program/enums';
import { BonusSyncOutResponseDto } from '@business-loyalty-program/types';

@Controller()
export class SyncOutController {
  constructor(
    private readonly bonusSyncOutRepository: BonusSyncOutRepository
  ) {}

  @GetWithDocs('/sync-out', BonusSyncOutResponseDto, true)
  @IntegrationSecurity()
  public async getTasks() {
    const [collection] = await this.bonusSyncOutRepository.getList(
      { limit: 10000 },
      {
        status: EBonusSyncOutStatus.New,
      }
    );

    return collection;
  }

  @PostWithDocs('/sync-out/complete')
  @IntegrationSecurity()
  @ApiBody({ type: [String] })
  public async completeTasks(
    @Body(new ParseArrayPipe({ items: String })) body: string[]
  ) {
    await this.bonusSyncOutRepository.bulkUpdateStatus(body);
  }
}
