import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { ServiceEntity } from '@app/common/services/service.entity';
import { AppletEntity } from '@app/common/applets/applet.entity';
import { AppletRequiredConfigEntity } from '@app/common/applets/required_configuration/applet.required.config.entity';

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

  @OneToMany(
    () => AppletRequiredConfigEntity,
    (appletRequiredConfig) => appletRequiredConfig.action,
  )
  config: AppletRequiredConfigEntity[];
}
