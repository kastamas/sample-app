import { Module } from '@nestjs/common';
import { OneSignalService } from './one-signal.service';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [
    HttpModule.register({
      baseURL: 'https://onesignal.com/api/v1',
      headers: {
        Authorization: `Basic ${process.env.ONE_SIGNAL_TOKEN}`,
      },
    }),
  ],
  providers: [OneSignalService],
  exports: [OneSignalService],
})
export class OneSignalModule {}
