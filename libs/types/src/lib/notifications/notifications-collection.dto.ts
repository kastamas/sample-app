import { BaseCollection } from '@flexypw/backend-core';
import { ApiProperty } from '@nestjs/swagger';
import { NotificationsResponseDto } from './notifications-response.dto';

export class NotificationsCollectionDto extends BaseCollection<NotificationsResponseDto> {
  @ApiProperty({ type: [NotificationsResponseDto] })
  public data: NotificationsResponseDto[];
}
