import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { BaseRepository, InjectRepository } from '@flexypw/database';
import { BonusSyncOutModel } from './bonus-sync-out.model';
import { EBonusSyncOutStatus } from '@business-loyalty-program/enums';

@Injectable()
export class BonusSyncOutRepository extends BaseRepository<BonusSyncOutModel> {
  constructor(
    @InjectRepository(BonusSyncOutModel)
    repository: Repository<BonusSyncOutModel>
  ) {
    super(repository);
  }

  protected getBaseRelations(): string[] {
    return [];
  }

  public bulkUpdateStatus(ids: string[]) {
    return this.repository.update(ids, {
      status: EBonusSyncOutStatus.Finished,
    });
  }
}
