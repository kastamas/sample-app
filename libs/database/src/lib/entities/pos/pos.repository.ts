import { Injectable } from '@nestjs/common';
import { In, Repository } from 'typeorm';
import { PosModel } from './pos.model';
import { BaseRepository, InjectRepository } from '@flexypw/database';
import { PosSyncDto } from '@business-loyalty-program/types';

@Injectable()
export class PosRepository extends BaseRepository<PosModel> {
  constructor(@InjectRepository(PosModel) repository: Repository<PosModel>) {
    super(repository);
  }

  protected getBaseRelations(): string[] {
    return [];
  }

  public async bulkUpsert(data: PosSyncDto[]) {
    const posInstances = this.repository.create(data);

    await this.repository.save(posInstances);
  }

  public async getEntityParts(posIds?: string[], fieldName = 'pos') {
    if (!posIds) {
      return {};
    }

    const pos = await this.repository.find({
      id: In(posIds),
    });

    return { [fieldName]: pos };
  }
}
