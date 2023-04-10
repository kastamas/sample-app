import {
  Entity,
  Column,
  ManyToOne,
  JoinColumn,
  ManyToMany,
  JoinTable,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { CustomImageModel } from '../custom-image/custom-image.model';
import { EUserGender } from '@business-loyalty-program/enums';
import { CityModel } from '../city/city.model';
import { PosModel } from '../pos/pos.model';

@Entity()
export class UserModel {
  @PrimaryGeneratedColumn('uuid')
  public id: string;

  @Column('text', { unique: true, nullable: true })
  public cardNumber: string;

  @Column('text', { unique: true, nullable: true })
  public corporateCardNumber: string;

  @Column({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
  })
  public createdAt: Date;

  @Column({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
  })
  public updatedAt: Date;

  @Column('text', { nullable: true })
  public name?: string;

  @Column('text', { nullable: true })
  public surname?: string;

  @ManyToOne(() => CustomImageModel)
  @JoinColumn()
  public image?: CustomImageModel;

  @Column('text', { nullable: true })
  public phone?: string;

  @Column('float', { default: 0 })
  public bonusAmount: number;

  @Column('float', { default: 0 })
  public corporateBonusAmount: number;

  @Column('boolean', { default: false })
  public isRegistered: boolean;

  @ManyToOne(() => CityModel, { nullable: true })
  @JoinColumn()
  public city?: CityModel;

  @Column('text', { nullable: true })
  public patronymic?: string;

  @Column('timestamp', { nullable: true })
  public dateOfBirth?: string;

  @Column({
    type: 'enum',
    enum: EUserGender,
    nullable: true,
  })
  public gender?: EUserGender;

  @Column('text', { nullable: true })
  public email?: string;

  @Column('boolean', { nullable: true })
  public is18?: boolean;

  @Column('text', { nullable: true })
  public referralCode?: string;

  @Column('text', { nullable: true })
  public referralFrom?: string;

  @ManyToMany(() => PosModel)
  @JoinTable()
  public favouritePos: PosModel[];
}
