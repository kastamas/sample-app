import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { BaseRepository, InjectRepository } from '@flexypw/database';
import { NotificationModel } from './notification.model';

@Injectable()
export class NotificationRepository extends BaseRepository<NotificationModel> {
  constructor(
    @InjectRepository(NotificationModel)
    repository: Repository<NotificationModel>
  ) {
    super(repository);
  }

  protected getBaseRelations(): string[] {
    return ['pos', 'cities', 'image'];
  }

  public getCollection() {
    return this.repository.findAndCount({
      relations: this.getBaseRelations(),
      take: 2000,
      order: {
        createdAt: 'DESC',
      },
    });
  }
}
