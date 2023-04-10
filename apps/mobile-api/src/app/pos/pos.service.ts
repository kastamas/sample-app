import { Injectable } from '@nestjs/common';
import { PosRepository } from '@business-loyalty-program/database';

@Injectable()
export class PosService {
  constructor(private readonly posRepository: PosRepository) {}

  public getList() {
    return this.posRepository.getList({ offset: 0, limit: 1000 });
  }
}
