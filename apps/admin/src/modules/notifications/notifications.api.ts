import { ApiMethod, BaseApi, buildApiHooks } from '@flexypw/react-tools';
import {
  NotificationsCollectionDto,
  NewNotificationDto,
  NotificationsResponseDto,
} from '@business-loyalty-program/types';

export class NotificationsApi extends BaseApi {
  @ApiMethod()
  public getNotifications(): Promise<NotificationsCollectionDto> {
    return this.client.get('/notifications');
  }

  @ApiMethod()
  public createNotification(
    body: NewNotificationDto
  ): Promise<NotificationsResponseDto> {
    return this.client.post('/notifications', body);
  }
}

const { useCreateNotification, useGetNotifications } =
  buildApiHooks(NotificationsApi);

export { useCreateNotification, useGetNotifications };
