import { Injectable } from '@nestjs/common';
import { IntegrationTokenRepository } from '@business-loyalty-program/database';
import {
  IntegrationCollectionQueryDto,
  NewIntegrationDto,
} from '@business-loyalty-program/types';
import { generateHashWithTimestamp } from '@flexypw/backend-core';

@Injectable()
export class IntegrationService {
  constructor(
    private readonly integrationTokenRepository: IntegrationTokenRepository
  ) {}

  public create(body: NewIntegrationDto) {
    const token = generateHashWithTimestamp(body.name);

    return this.integrationTokenRepository.create({
      ...body,
      token,
    });
  }

  public getList(query: IntegrationCollectionQueryDto) {
    return this.integrationTokenRepository.getList(query);
  }

  public async delete(id: string) {
    await this.integrationTokenRepository.getByIdOrFail(id);
    await this.integrationTokenRepository.deleteById(id);
  }
}
