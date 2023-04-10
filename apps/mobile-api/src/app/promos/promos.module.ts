import { Module } from '@nestjs/common';
import { DatabaseModule } from '@business-loyalty-program/database';
import { PromosController } from './promos.controller';
import { PromosService } from './promos.service';

@Module({
  imports: [DatabaseModule],
  controllers: [PromosController],
  providers: [PromosService],
})
export class PromosModule {}
