import {
  Column,
  CreateDateColumn,
  Entity,
  Generated,
  PrimaryColumn,
} from 'typeorm';

@Entity('apartments')
export class RentEntity {
  @PrimaryColumn()
  @Generated('uuid')
  id: string;

  @Column({ type: 'double precision' })
  lat: number;

  @Column({ type: 'double precision' })
  lng: number;

  @Column()
  title: string;

  @Column({ nullable: true })
  description?: string;

  @Column()
  price: number;

  @Column({ nullable: true })
  urlImage?: string;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @CreateDateColumn({ nullable: true })
  deleteDate: Date;
}
