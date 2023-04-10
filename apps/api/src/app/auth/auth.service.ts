import { Injectable } from '@nestjs/common';
import { IJwtAuthService, ILocalAuthService } from '@flexypw/auth';
import {
  CompanyModel,
  CompanyRepository,
} from '@business-loyalty-program/database';

@Injectable()
export class AuthService
  implements ILocalAuthService<CompanyModel>, IJwtAuthService<CompanyModel>
{
  constructor(private readonly companyRepository: CompanyRepository) {}

  public async getUserJwtStrategy(id: string): Promise<CompanyModel> {
    return await this.companyRepository.getById(id);
  }

  public async getUserLocalStrategy(email: string, hashPass: string) {
    return await this.companyRepository.getByEmailAndPass(email, hashPass);
  }
}
