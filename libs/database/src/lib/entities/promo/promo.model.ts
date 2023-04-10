import {
  Entity,
  Column,
  ManyToOne,
  JoinColumn,
  ManyToMany,
  JoinTable,
} from 'typeorm';
import { BaseEntity } from '@flexypw/database';
import { EPromoStatus } from '@business-loyalty-program/enums';
import { CustomImageModel } from '../custom-image/custom-image.model';
import { PosModel } from '../pos/pos.model';

@Entity()
export class PromoModel extends BaseEntity {
  @ManyToOne(() => CustomImageModel)
  @JoinColumn()
  public image: CustomImageModel;

  @Column('text')
  public name: string;

  @Column('text')
  public description: string;

  @Column('text', { nullable: true })
  public summary: string;

  @Column({
    type: 'enum',
    enum: EPromoStatus,
    default: EPromoStatus.Active,
  })
  public status: EPromoStatus;

  @ManyToMany(() => PosModel)
  @JoinTable()
  public pos: PosModel[];
}
