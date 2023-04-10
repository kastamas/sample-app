import { Injectable } from '@nestjs/common';
import { UserRepository } from '@business-loyalty-program/database';
import { UsersCollectionQueryDto } from '@business-loyalty-program/types';

@Injectable()
export class UsersService {
  constructor(private readonly userRepository: UserRepository) {}

  public getCollection(query: UsersCollectionQueryDto) {
    return this.userRepository.getList(query);
  }

  public getSingle(id: string) {
    return this.userRepository.getById(id);
  }
}
