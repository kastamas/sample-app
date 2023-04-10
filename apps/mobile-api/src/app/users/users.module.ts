import { Module } from '@nestjs/common';
import { DatabaseModule } from '@business-loyalty-program/database';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { OneSignalModule } from '@business-loyalty-program/api-common';

@Module({
  imports: [DatabaseModule, OneSignalModule],
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule {}
