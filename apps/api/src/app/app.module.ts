import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { CompaniesModule } from './companies/companies.module';
import { FilesModule } from './files/files.module';
import { UsersModule } from './users/users.module';
import { PosModule } from './pos/pos.module';
import { IntegrationModule } from './integration/integration.module';
import { PromosModule } from './promos/promos.module';
import { NotificationsModule } from './notifications/notifications.module';
import { CitiesModule } from './cities/cities.module';

@Module({
  imports: [
    AuthModule,
    FilesModule,
    CompaniesModule,
    UsersModule,
    PosModule,
    IntegrationModule,
    PromosModule,
    NotificationsModule,
    CitiesModule,
  ],
})
export class AppModule {}
