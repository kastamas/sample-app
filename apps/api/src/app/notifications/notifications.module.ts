import { Module } from '@nestjs/common';
import { NotificationsController } from './notications.controller';
import { NotificationsService } from './notifications.service';
import { DatabaseModule } from '@business-loyalty-program/database';
import { ScheduleModule } from '@nestjs/schedule';
import { NotificationsScheduler } from './notifications.scheduler';
import { OneSignalModule } from '@business-loyalty-program/api-common';

@Module({
  imports: [DatabaseModule, ScheduleModule.forRoot(), OneSignalModule],
  providers: [NotificationsService, NotificationsScheduler],
  controllers: [NotificationsController],
})
export class NotificationsModule {}
