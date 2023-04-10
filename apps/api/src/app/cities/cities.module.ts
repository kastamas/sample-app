import { Module } from '@nestjs/common';
import { DatabaseModule } from '@business-loyalty-program/database';
import { CitiesService } from './cities.service';
import { CitiesController } from './cities.controller';

@Module({
  imports: [DatabaseModule],
  providers: [CitiesService],
  controllers: [CitiesController],
})
export class CitiesModule {}
