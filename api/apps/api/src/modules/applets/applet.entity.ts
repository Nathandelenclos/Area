import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  JoinColumn,
} from 'typeorm';
import { AppletConfigEntity } from './configuration/applet.config.entity';

@Entity('applets')
export class AppletEntity {
  @PrimaryGeneratedColumn()
  id: number;

  // TODO Link to user, action

  @Column()
  name: string;

  @Column()
  description: string;

  @Column()
  is_active: boolean;

  @OneToMany(
    (type) => AppletConfigEntity,
    (appletConfig) => appletConfig.applet,
  )
  @JoinColumn({ name: 'applet_id' })
  applet_configs: AppletConfigEntity[];
}
