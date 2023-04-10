import { Injectable } from '@nestjs/common';
import { PromoRepository } from '@business-loyalty-program/database';
import { PromoCollectionQueryDto } from '@business-loyalty-program/types';

@Injectable()
export class PromosService {
  constructor(private readonly promoRepository: PromoRepository) {}

  public getCollection({ status, ...query }: PromoCollectionQueryDto) {
    const conditions: Record<string, any> = {};
    if (status) {
      conditions.status = status;
    }

    return this.promoRepository.getList(query, conditions);
  }
}
