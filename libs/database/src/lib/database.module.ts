import { DatabaseBaseModule } from '@flexypw/database';
import { CompanyModel } from './entities/company/company.model';
import { CustomImageModel } from './entities/custom-image/custom-image.model';
import { PosModel } from './entities/pos/pos.model';
import { UserModel } from './entities/user/user.model';
import { CompanyRepository } from './entities/company/company.repository';
import { CustomImageRepository } from './entities/custom-image/custom-image.repository';
import { UserRepository } from './entities/user/user.repository';
import { PosRepository } from './entities/pos/pos.repository';
import { IntegrationTokenModel } from './entities/integration-token/integration-token.model';
import { IntegrationTokenRepository } from './entities/integration-token/integration-token.repository';
import { CityModel } from './entities/city/city.model';
import { CityRepository } from './entities/city/city.repository';
import { PromoModel } from './entities/promo/promo.model';
import { PromoRepository } from './entities/promo/promo.repository';
import { BonusSyncOutModel } from './entities/bonus-sync-out/bonus-sync-out.model';
import { BonusSyncOutRepository } from './entities/bonus-sync-out/bonus-sync-out.repository';
import { NotificationModel } from './entities/notification/notification.model';
import { NotificationRepository } from './entities/notification/notification.repository';

export const DatabaseModule = DatabaseBaseModule.register(
  {
    entities: [
      CompanyModel,
      CustomImageModel,
      PosModel,
      UserModel,
      IntegrationTokenModel,
      CityModel,
      PromoModel,
      BonusSyncOutModel,
      NotificationModel,
    ],
    repositories: [
      CompanyRepository,
      CustomImageRepository,
      UserRepository,
      PosRepository,
      IntegrationTokenRepository,
      CityRepository,
      PromoRepository,
      BonusSyncOutRepository,
      NotificationRepository,
    ],
  },
  {
    logging: false,
  }
);
