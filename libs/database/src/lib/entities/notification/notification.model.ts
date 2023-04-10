import {
  Entity,
  Column,
  ManyToOne,
  JoinColumn,
  ManyToMany,
  JoinTable,
} from 'typeorm';
import { BaseEntity } from '@flexypw/database';
import {
  ENotificationStatus,
  EUserGender,
} from '@business-loyalty-program/enums';
import { PosModel } from '../pos/pos.model';
import { CityModel } from '../city/city.model';
import { CustomImageModel } from '../custom-image/custom-image.model';

@Entity()
export class NotificationModel extends BaseEntity {
  @Column('timestamp with time zone', { default: () => 'CURRENT_TIMESTAMP' })
  public date: string;

  @Column({
    type: 'enum',
    enum: EUserGender,
    nullable: true,
  })
  public gender?: EUserGender;

  @Column('text')
  public text: string;

  @ManyToMany(() => PosModel)
  @JoinTable()
  public pos: PosModel[];

  @ManyToMany(() => CityModel)
  @JoinTable()
  public cities: CityModel[];

  @ManyToOne(() => CustomImageModel)
  @JoinColumn()
  public image?: CustomImageModel;

  @Column({
    type: 'enum',
    enum: ENotificationStatus,
    default: ENotificationStatus.New,
  })
  public status: ENotificationStatus;
}
