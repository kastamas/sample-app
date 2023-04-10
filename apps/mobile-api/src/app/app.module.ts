import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { PosModule } from './pos/pos.module';
import { FilesModule } from './files/files.module';
import { CitiesModule } from './cities/cities.module';
import { PromosModule } from './promos/promos.module';

@Module({
  imports: [
    AuthModule,
    UsersModule,
    PosModule,
    FilesModule,
    CitiesModule,
    PromosModule,
  ],
})
export class AppModule {}
