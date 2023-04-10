import { Entity, Column } from 'typeorm';
import { BaseEntity } from '@flexypw/database';

@Entity()
export class CityModel extends BaseEntity {
  @Column('text')
  public name: string;
}
