import { Injectable } from '@nestjs/common';
import { In, Repository } from 'typeorm';
import { BaseRepository, InjectRepository } from '@flexypw/database';
import { CityModel } from './city.model';

@Injectable()
export class CityRepository extends BaseRepository<CityModel> {
  constructor(@InjectRepository(CityModel) repository: Repository<CityModel>) {
    super(repository);
  }

  protected getBaseRelations(): string[] {
    return [];
  }

  public async getEntityParts(cityIds?: string[], fieldName = 'cities') {
    if (!cityIds) {
      return {};
    }

    const cities = await this.repository.find({
      id: In(cityIds),
    });

    return { [fieldName]: cities };
  }

  public async getEntityPart(cityId?: string) {
    if (!cityId) {
      return {};
    }

    const city = await this.getByIdOrFail(cityId);
    return { city };
  }
}
