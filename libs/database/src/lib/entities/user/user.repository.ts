import { Injectable } from '@nestjs/common';
import { Connection, In, Raw, Repository } from 'typeorm';
import { UserModel } from './user.model';
import { BaseRepository, InjectRepository } from '@flexypw/database';
import { UserSyncDto } from '@business-loyalty-program/types';
import { flatten, flow, map, find, filter, pick, assign } from 'lodash/fp';
import { EUserGender } from '@business-loyalty-program/enums';

@Injectable()
export class UserRepository extends BaseRepository<UserModel> {
  constructor(
    @InjectRepository(UserModel) repository: Repository<UserModel>,
    private readonly connection: Connection
  ) {
    super(repository);
  }

  protected getBaseRelations(): string[] {
    return ['image', 'city', 'favouritePos'];
  }

  public getByReferralCodeCount(referralCode: string) {
    return this.repository.count({
      where: { referralFrom: referralCode },
    });
  }

  public getByReferralCode(referralCode: string) {
    return this.repository.findOne({ referralCode });
  }

  public getById(id: string): Promise<UserModel> {
    return this.repository.findOneOrFail(
      { id },
      {
        relations: ['image', 'city', 'favouritePos'],
      }
    );
  }

  public getUserIdsForNotifications(
    cityIds: string[],
    posIds: string[],
    gender: EUserGender | null,
    offset: number,
    limit: number
  ) {
    return this.connection.query(
      `
        SELECT user_model.id from user_model
        LEFT JOIN user_model_favourite_pos_pos_model pos ON pos."userModelId" = user_model.id
        WHERE
            ${gender ? `gender = '${gender}' AND ` : ''}
            ${
              cityIds.length ? `"cityId" IN ('${cityIds.join("','")}') AND` : ''
            }
            ${
              posIds.length
                ? `pos."posModelExternalId" IN ('${posIds.join("','")}') AND`
                : ''
            }
            "isRegistered" IS TRUE
        GROUP BY user_model.id
        LIMIT $1
        OFFSET $2;
    `,
      [limit, offset]
    );
  }

  public findByCardNumber(cardNumber: string) {
    return this.repository.findOneOrFail({
      where: [{ cardNumber }, { corporateCardNumber: cardNumber }],
    });
  }

  public findByPhone(phone: string) {
    return this.repository.findOneOrFail({ phone });
  }

  public getUpcomingBirthdays() {
    return this.repository.find({
      where: {
        dateOfBirth: Raw(
          (alias) =>
            `to_char(${alias} - INTERVAL '3 day', 'MM-DD') = to_char(current_date, 'MM-DD')`
        ),
      },
    });
  }

  public async bulkUpsert(data: UserSyncDto[]) {
    const getCardNumbers = (item: UserSyncDto) => [
      item.cardNumber,
      item.corporateCardNumber,
    ];

    const allCardNumbers = flow(
      map(getCardNumbers),
      flatten,
      filter(Boolean)
    )(data);

    const existingUsers = await this.repository.find({
      where: [
        { cardNumber: In(allCardNumbers) },
        { corporateCardNumber: In(allCardNumbers) },
      ],
    });

    const getExistingUser = (item: UserSyncDto) =>
      find(
        (instance: UserModel) =>
          instance.cardNumber === item.cardNumber ||
          instance.corporateCardNumber === item.corporateCardNumber,
        existingUsers
      );

    const instances = data.map((item) => {
      const existingUser = getExistingUser(item);

      if (existingUser) {
        existingUser.updatedAt = new Date();

        if (existingUser.isRegistered) {
          return assign(
            existingUser,
            pick(
              [
                'corporateCardNumber',
                'cardNumber',
                'bonusAmount',
                'corporateBonusAmount',
              ],
              item
            )
          );
        } else {
          return {
            ...existingUser,
            ...item,
          };
        }
      } else {
        return item;
      }
    });

    await this.repository.save(instances);
  }
}
