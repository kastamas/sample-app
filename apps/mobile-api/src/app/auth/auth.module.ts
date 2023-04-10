import { Module } from '@nestjs/common';
import { BaseAuthModule, JwtAuthModule } from '@flexypw/auth';
import { JwtStrategy } from './strategies/jwt.strategy';
import { DatabaseModule } from '@business-loyalty-program/database';
import { AuthController } from './auth.controller';
import { AuthStrategiesService } from './auth-strategies.service';
import { RedisModule } from '@liaoliaots/nestjs-redis';
import { PhoneAuthService } from './services/phone-auth.service';
import { SmsService } from './services/sms-service';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [
    DatabaseModule,
    BaseAuthModule,
    RedisModule.forRoot({
      config: {
        url: `redis://${process.env.REDIS_HOST}:${process.env.REDIS_PORT}`,
      }
    }),
    JwtAuthModule.register({
      imports: [DatabaseModule],
      providers: [JwtStrategy, AuthStrategiesService],
    }),
    HttpModule,
  ],
  controllers: [AuthController],
  providers: [PhoneAuthService, SmsService],
})
export class AuthModule {}
