import { Module } from '@nestjs/common';
import { DatabaseModule } from '@business-loyalty-program/database';
import { PosController } from './pos.controller';

@Module({
  imports: [DatabaseModule],
  controllers: [PosController],
})
export class PosModule {}
