import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { ServiceEntity } from '@app/common/services/service.entity';

@Entity('reaction')
export class ReactionEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column()
  is_available: boolean;

  @ManyToOne(() => ServiceEntity, (service) => service.reactions)
  service: ServiceEntity;
}
