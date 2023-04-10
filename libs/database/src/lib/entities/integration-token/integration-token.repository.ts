import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { IntegrationTokenModel } from './integration-token.model';
import { BaseRepository, InjectRepository } from '@flexypw/database';

@Injectable()
export class IntegrationTokenRepository extends BaseRepository<IntegrationTokenModel> {
  constructor(
    @InjectRepository(IntegrationTokenModel)
    repository: Repository<IntegrationTokenModel>
  ) {
    super(repository);
  }

  protected getBaseRelations(): string[] {
    return [];
  }

  public getByIdAndCompany(id: string) {
    return this.repository.findOneOrFail({
      where: {
        id,
      },
    });
  }

  public getByValue(token: string) {
    return this.repository.findOne({
      where: { token },
    });
  }
}
