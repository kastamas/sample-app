import { Injectable } from '@nestjs/common';
import {
  CityRepository,
  CustomImageRepository,
  NotificationRepository,
  PosRepository,
} from '@business-loyalty-program/database';
import { NewNotificationDto } from '@business-loyalty-program/types';

@Injectable()
export class NotificationsService {
  constructor(
    private readonly notificationRepository: NotificationRepository,
    private readonly posRepository: PosRepository,
    private readonly customImageRepository: CustomImageRepository,
    private readonly cityRepository: CityRepository
  ) {}

  public async create({
    posIds,
    cityIds,
    imageId,
    ...body
  }: NewNotificationDto) {
    return this.notificationRepository.create({
      ...body,
      ...(await this.posRepository.getEntityParts(posIds)),
      ...(await this.cityRepository.getEntityParts(cityIds)),
      ...(await this.customImageRepository.getImageEntityPart(imageId)),
    });
  }

  public getCollection() {
    return this.notificationRepository.getCollection();
  }
}
