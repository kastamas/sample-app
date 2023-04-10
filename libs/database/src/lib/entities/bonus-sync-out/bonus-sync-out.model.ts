import { Entity, Column } from 'typeorm';
import { BaseEntity } from '@flexypw/database';
import { EBonusSyncOutStatus } from '@business-loyalty-program/enums';

@Entity()
export class BonusSyncOutModel extends BaseEntity {
  @Column('float', { nullable: false })
  public bonusChange: number;

  @Column('text', { nullable: false })
  public cardNumber: string;

  @Column({
    type: 'enum',
    enum: EBonusSyncOutStatus,
    default: EBonusSyncOutStatus.New,
  })
  public status: EBonusSyncOutStatus;
}
