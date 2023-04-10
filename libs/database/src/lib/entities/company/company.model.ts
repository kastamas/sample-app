import { Entity, Column, JoinColumn, ManyToOne } from 'typeorm';
import { BaseEntity } from '@flexypw/database';
import { CustomImageModel } from '../custom-image/custom-image.model';

@Entity()
export class CompanyModel extends BaseEntity {
  @Column('text', {
    select: false,
  })
  public password: string;

  @Column('text', { unique: true })
  public email: string;

  @Column('text')
  public name: string;

  @Column('text', { nullable: true })
  public phone: string;

  @Column('text', { nullable: true })
  public description: string;

  @ManyToOne(() => CustomImageModel)
  @JoinColumn()
  public image?: CustomImageModel;
}
