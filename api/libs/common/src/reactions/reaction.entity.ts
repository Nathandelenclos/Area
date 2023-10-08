import {
  Column,
  Entity,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { ServiceEntity } from '@app/common/services/service.entity';
import { AppletEntity } from '@app/common/applets/applet.entity';

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

  @ManyToMany(() => AppletEntity, (applet) => applet.reactions)
  applets: AppletEntity[];
}
