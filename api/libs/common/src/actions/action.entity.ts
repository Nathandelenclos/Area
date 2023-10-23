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

@Entity('action')
export class ActionEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column()
  is_available: boolean;

  @ManyToOne(() => ServiceEntity, (service) => service.actions)
  service: ServiceEntity;

  @OneToMany(() => AppletEntity, (applet) => applet.action)
  applets: AppletEntity[];

  @OneToMany(() => AppletConfigEntity, (appletConfig) => appletConfig.action)
  action_configs: AppletConfigEntity[];
}
