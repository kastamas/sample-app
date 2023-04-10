import { Injectable } from '@nestjs/common';
import { CityRepository } from '@business-loyalty-program/database';

@Injectable()
export class CitiesService {
  constructor(private readonly cityRepository: CityRepository) {}

  public getList() {
    return this.cityRepository.getList({ offset: 0, limit: 1000 });
  }
}
