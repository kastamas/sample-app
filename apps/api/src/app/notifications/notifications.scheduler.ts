import { Injectable, Logger } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import {
  NotificationModel,
  NotificationRepository,
  PosRepository,
  UserRepository,
} from '@business-loyalty-program/database';
import { ENotificationStatus } from '@business-loyalty-program/enums';
import { OneSignalService } from '@business-loyalty-program/api-common';
import { Raw } from 'typeorm';

const USERS_LIMIT = 2000;

@Injectable()
export class NotificationsScheduler {
  private readonly logger = new Logger(NotificationsScheduler.name);
  private isOccupied = false;

  constructor(
    private readonly oneSignalService: OneSignalService,
    private readonly userRepository: UserRepository,
    private readonly posRepository: PosRepository,
    private readonly notificationRepository: NotificationRepository
  ) {}

  @Cron('*/10 * * * * *')
  public async broadcastNotifications() {
    if (!this.isOccupied) {
      this.isOccupied = true;

      try {
        const [notificationsToSend] = await this.notificationRepository.getList(
          {
            limit: 50,
          },
          {
            status: ENotificationStatus.New,
            date: Raw((alias) => `${alias} <= CURRENT_TIMESTAMP`),
          }
        );

        for (const notification of notificationsToSend) {
          await this.handleNotification(notification);
        }
      } catch (error) {
        this.logger.error(error);
        this.logger.error('Error while sending notification', error);
      } finally {
        this.isOccupied = false;
      }
    } else {
      this.logger.log('Scheduler is busy');
    }
  }

  private async handleNotification(notification: NotificationModel) {
    try {
      this.logger.log(`Processing notification ${notification.id}`);
      await this.notificationRepository.update(notification, {
        status: ENotificationStatus.InProgress,
      });

      const [_, posCount] = await this.posRepository.getList({ limit: 1000 });

      const posIdsCondition =
        posCount === notification.pos.length
          ? []
          : notification.pos.map((item) => item.externalId);

      const userBatches = await this.getUsersBatches(0, [], {
        gender: notification.gender,
        posIds: posIdsCondition,
        cityIds: notification.cities.map((item) => item.id),
      });

      this.logger.log(
        `Sending notification for ${userBatches.length} user batches`
      );

      for (const batch of userBatches) {
        if (batch.length > 0) {
          await this.oneSignalService.sendNotification(
            notification.text,
            batch,
            notification.image.medium
          );
          this.logger.log(`Handling batch`);
          this.logger.log(batch);
        }
      }

      await this.notificationRepository.update(notification, {
        status: ENotificationStatus.Done,
      });

      this.logger.log(`Notification ${notification.id} was sent`);
    } catch (error) {
      this.logger.error(error);
      this.logger.error('Error while sending notification', error);

      await this.notificationRepository.update(notification, {
        status: ENotificationStatus.New,
      });
    }
  }

  private async getUsersBatches(
    offset: number,
    batches: string[][],
    condintions: any
  ) {
    const users = await this.userRepository.getUserIdsForNotifications(
      condintions.cityIds,
      condintions.posIds,
      condintions.gender,
      offset,
      USERS_LIMIT
    );

    const newBatches = [...batches, users.map((user) => user.id)];

    if (users.length < USERS_LIMIT) {
      return newBatches;
    }

    if (users.length === USERS_LIMIT) {
      return this.getUsersBatches(
        offset + USERS_LIMIT,
        newBatches,
        condintions
      );
    }
  }
}
