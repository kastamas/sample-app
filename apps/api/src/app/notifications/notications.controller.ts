import { ApiTags } from '@nestjs/swagger';
import { Body, Controller } from '@nestjs/common';
import { GetWithDocs, PostWithDocs } from '@flexypw/backend-core';
import { NotificationsService } from './notifications.service';
import { JwtSecurity } from '@flexypw/auth';
import {
  NewNotificationDto,
  NotificationsCollectionDto,
  NotificationsResponseDto,
} from '@business-loyalty-program/types';

@Controller()
@ApiTags('Notifications')
export class NotificationsController {
  constructor(private notificationService: NotificationsService) {}

  @PostWithDocs('/notifications', NotificationsResponseDto)
  @JwtSecurity()
  public createNotification(@Body() body: NewNotificationDto) {
    return this.notificationService.create(body);
  }

  @GetWithDocs('/notifications', NotificationsCollectionDto)
  @JwtSecurity()
  public getNotificationCollection() {
    return this.notificationService.getCollection();
  }
}
