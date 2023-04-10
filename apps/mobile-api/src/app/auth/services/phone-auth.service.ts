import {
  ConflictException,
  Injectable,
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { randomInRange } from '../../../common/utils/random';
import { AuthWithCodeDto } from '@business-loyalty-program/types';
import { RedisService } from '@liaoliaots/nestjs-redis';
import { UserRepository } from '@business-loyalty-program/database';
import { SmsService } from './sms-service';
import { BaseAuthService } from '@flexypw/auth';
import { HttpService } from '@nestjs/axios';

@Injectable()
export class PhoneAuthService {
  constructor(
    private readonly httpService: HttpService,
    private readonly baseAuthService: BaseAuthService,
    private readonly redisService: RedisService,
    private readonly userRepository: UserRepository,
    private readonly smsService: SmsService
  ) {}

  private getCheckKey(phone: string) {
    return `${phone}:check`;
  }

  private getResultKey(phone: string) {
    return `${phone}:result`;
  }

  public async createCode(cardNumber: string) {
    const redisClient = this.redisService.getClient();
    const isNotExpired = await redisClient.get(this.getCheckKey(cardNumber));
    if (isNotExpired) {
      throw new ConflictException();
    }

    const user = await this.userRepository.findByCardNumber(cardNumber);

    const code = randomInRange(100000, 999999);

    await redisClient.setex(this.getCheckKey(cardNumber), 60, 'true');
    await redisClient.setex(this.getResultKey(cardNumber), 60 * 60, code);

    await this.smsService.sendMessage(user.phone, `Ваш код для входа: ${code}`);

    return { phone: user.phone };
  }

  private async validateCode(cardNumber: string, code: string) {
    const redisClient = this.redisService.getClient();
    const codeToCheck = await redisClient.get(this.getResultKey(cardNumber));

    if (!codeToCheck) {
      throw new NotFoundException();
    }

    if (code !== codeToCheck) {
      throw new UnprocessableEntityException();
    }

    await redisClient.del(
      this.getResultKey(cardNumber),
      this.getCheckKey(cardNumber)
    );
  }

  public async auth({ phone, code }: AuthWithCodeDto) {
    const user = await this.userRepository.findByPhone(phone);
    await this.validateCode(user.cardNumber, code);

    return this.baseAuthService.generateTokens(user);
  }
}
