import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('service')
export class ServiceEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  url: string;

  @Column()
  is_available: boolean;
}
