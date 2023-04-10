import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { BaseRepository, InjectRepository } from '@flexypw/database';
import { PromoModel } from './promo.model';

@Injectable()
export class PromoRepository extends BaseRepository<PromoModel> {
  constructor(
    @InjectRepository(PromoModel) repository: Repository<PromoModel>
  ) {
    super(repository);
  }

  protected getBaseRelations(): string[] {
    return ['image', 'pos'];
  }
}
