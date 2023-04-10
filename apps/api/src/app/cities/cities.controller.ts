import { Controller } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { GetWithDocs } from '@flexypw/backend-core';
import { CitiesResponseDto } from '@business-loyalty-program/types';
import { CitiesService } from './cities.service';

@Controller()
@ApiTags('Cities')
export class CitiesController {
  constructor(private readonly citiesService: CitiesService) {}

  @GetWithDocs('/cities', CitiesResponseDto, true)
  public async getCollection() {
    const [list] = await this.citiesService.getList();

    return list;
  }
}
