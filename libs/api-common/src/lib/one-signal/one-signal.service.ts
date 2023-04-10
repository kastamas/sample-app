import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';

@Injectable()
export class OneSignalService {
  constructor(private readonly httpService: HttpService) {}

  public sendNotification(
    content: string,
    userIds: string[],
    imageUrl?: string
  ): Promise<any> {
    return this.httpService
      .post('/notifications', {
        app_id: process.env.ONE_SIGNAL_APP_ID,
        contents: { en: content },
        include_external_user_ids: userIds,
        ...(imageUrl
          ? {
              big_picture: imageUrl,
              ios_attachments: {
                picture: imageUrl,
              },
            }
          : {}),
      })
      .toPromise();
  }
}
