import { Injectable } from '@nestjs/common';
import { IJwtAuthService } from '@flexypw/auth';
import { UserModel, UserRepository } from '@business-loyalty-program/database';

@Injectable()
export class AuthStrategiesService implements IJwtAuthService<UserModel> {
  constructor(private readonly userRepository: UserRepository) {}

  public async getUserJwtStrategy(id: string): Promise<UserModel> {
    return await this.userRepository.getById(id);
  }
}
