import { Injectable, Logger } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import {
  BonusSyncOutRepository,
  UserRepository,
} from '@business-loyalty-program/database';
import { OneSignalService } from '@business-loyalty-program/api-common';

@Injectable()
export class SyncOutScheduler {
  private readonly logger = new Logger(SyncOutScheduler.name);

  constructor(
    private readonly userRepository: UserRepository,
    private readonly bonusSyncOutRepository: BonusSyncOutRepository,
    private readonly oneSignalService: OneSignalService
  ) {}

  @Cron('0 5 * * *')
  public async birthdayCheckup() {
    this.logger.log(`Performing birthday checkup ${new Date().toDateString()}`);
    const upcomingBirthdaysUsers =
      await this.userRepository.getUpcomingBirthdays();

    for (const user of upcomingBirthdaysUsers) {
      if (user.cardNumber) {
        await this.bonusSyncOutRepository.create({
          cardNumber: user.cardNumber,
          bonusChange: 100,
        });

        this.logger.log(`Sending notification to user ${user.id}`);
        await this.oneSignalService
          .sendNotification('C Днем Рождения! Вам начислено 99 баллов!', [
            user.id,
          ])
          .catch((error) => {
            console.error(error.response.data);
          });
      }
    }
  }
}
