import { Injectable, Logger } from '@nestjs/common';
import {
  BonusSyncOutRepository,
  CityRepository,
  CustomImageRepository,
  PosRepository,
  UserModel,
  UserRepository,
} from '@business-loyalty-program/database';
import {
  SignupUserDto,
  UserUpdateMobileDto,
} from '@business-loyalty-program/types';
import ShortUniqueId from 'short-unique-id';
import { OneSignalService } from '@business-loyalty-program/api-common';

const uid = new ShortUniqueId({ length: 10 });

@Injectable()
export class UsersService {
  private readonly logger = new Logger(UsersService.name);

  constructor(
    private readonly userRepository: UserRepository,
    private readonly customImageRepository: CustomImageRepository,
    private readonly cityRepository: CityRepository,
    private readonly posRepository: PosRepository,
    private readonly bonusSyncOutRepository: BonusSyncOutRepository,
    private readonly oneSignalService: OneSignalService
  ) {}

  public async updateUser(
    user: UserModel,
    { imageId, cityId, favouritePosIds }: UserUpdateMobileDto
  ) {
    return this.userRepository.update(user, {
      ...(await this.customImageRepository.getImageEntityPart(imageId)),
      ...(await this.cityRepository.getEntityPart(cityId)),
      ...(await this.posRepository.getEntityParts(
        favouritePosIds,
        'favouritePos'
      )),
    });
  }

  public async signOutUser(user: UserModel) {
    await this.userRepository.update(user, {
      isRegistered: false,
    });
  }

  public async signUpUser(
    user: UserModel,
    { cityId, favouritePosIds, ...body }: SignupUserDto
  ) {
    const isNewRegistration = !user.referralCode;

    const updatedUser = await this.userRepository.update(user, {
      ...body,
      isRegistered: true,
      referralCode: user.referralCode || uid(),
      ...(await this.cityRepository.getEntityPart(cityId)),
      ...(await this.posRepository.getEntityParts(
        favouritePosIds,
        'favouritePos'
      )),
    });

    if (isNewRegistration && updatedUser.cardNumber) {
      await this.bonusSyncOutRepository.create({
        cardNumber: updatedUser.cardNumber,
        bonusChange: 99,
      });
      this.logger.log(
        `Sending notification for registration to uset ${updatedUser.id}`
      );
      await this.oneSignalService
        .sendNotification('Вам начислено 99 баллов за регистрацию!', [
          updatedUser.id,
        ])
        .catch((error) => {
          console.error(error.response.data);
        });
    }

    if (body.referralFrom) {
      const referralsAmount = await this.userRepository.getByReferralCodeCount(
        body.referralFrom
      );

      if (referralsAmount === 3) {
        const referrer = await this.userRepository.getByReferralCode(
          body.referralFrom
        );

        if (referrer.cardNumber) {
          await this.bonusSyncOutRepository.create({
            cardNumber: referrer.cardNumber,
            bonusChange: 100,
          });
        }
      }
    }

    return updatedUser;
  }
}
