import { Module } from '@nestjs/common';
import { DatabaseModule } from '@business-loyalty-program/database';
import { SyncOutController } from './sync-out.controller';
import { ScheduleModule } from '@nestjs/schedule';
import { SyncOutScheduler } from './sync-out.scheduler';
import { OneSignalModule } from '@business-loyalty-program/api-common';

@Module({
  imports: [DatabaseModule, ScheduleModule.forRoot(), OneSignalModule],
  controllers: [SyncOutController],
  providers: [SyncOutScheduler],
})
export class SyncOutModule {}
