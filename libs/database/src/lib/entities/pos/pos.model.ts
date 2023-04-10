import { Column, Entity, Generated, PrimaryColumn } from 'typeorm';

@Entity()
export class PosModel {
  @Column()
  @Generated('uuid')
  public id: string;

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

  @Column('text')
  public name: string;

  @Column('text')
  public address: string;

  @Column({ type: 'float', array: true })
  public coords: number[];

  @Column('text', { nullable: true })
  public note?: string;

  @Column('text', { nullable: true })
  public phone?: string;

  @PrimaryColumn()
  public externalId: string;
}
