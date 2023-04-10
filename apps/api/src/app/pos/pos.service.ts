import { Injectable } from '@nestjs/common';
import { PosRepository } from '@business-loyalty-program/database';
import { PosCollectionQueryDto } from '@business-loyalty-program/types';

@Injectable()
export class PosService {
  constructor(private readonly posRepository: PosRepository) {}

  public getList(query: PosCollectionQueryDto) {
    return this.posRepository.getList(query);
  }
}
