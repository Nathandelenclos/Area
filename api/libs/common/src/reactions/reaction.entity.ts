import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { ServiceEntity } from '@app/common/services/service.entity';
import { AppletEntity } from '@app/common/applets/applet.entity';
import { AppletConfigEntity } from '@app/common/applets/configuration/applet.config.entity';

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

  @Column()
  cmd: string;

  @ManyToOne(() => ServiceEntity, (service) => service.reactions)
  service: ServiceEntity;

  @OneToMany(() => AppletEntity, (applet) => applet.reaction)
  applets: AppletEntity[];

  @OneToMany(() => AppletConfigEntity, (appletConfig) => appletConfig.reaction)
  reaction_configs: AppletConfigEntity[];
}
