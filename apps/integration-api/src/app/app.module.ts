import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { PosModule } from './pos/pos.module';
import { SyncOutModule } from './sync-out/sync-out.module';

@Module({
  imports: [UsersModule, PosModule, SyncOutModule],
})
export class AppModule {}
