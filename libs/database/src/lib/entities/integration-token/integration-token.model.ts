import { Column, Entity } from 'typeorm';
import { BaseEntity } from '@flexypw/database';

@Entity()
export class IntegrationTokenModel extends BaseEntity {
  @Column('text')
  public name: string;

  @Column('text', { unique: true })
  public token: string;
}
