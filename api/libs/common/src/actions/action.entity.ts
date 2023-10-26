import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { ServiceEntity } from '@app/common/services/service.entity';
import { AppletRequiredConfigEntity } from '@app/common/applets/required_configuration/applet.required.config.entity';
import { ActionAppletEntity } from '@app/common/action-applet/action-applet.entity';

@Entity('action')
export class ActionEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  key: string;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column()
  is_available: boolean;

  @ManyToOne(() => ServiceEntity, (service) => service.actions)
  service: ServiceEntity;

  @OneToMany(
    () => AppletRequiredConfigEntity,
    (appletRequiredConfig) => appletRequiredConfig.action,
  )
  config: AppletRequiredConfigEntity[];

  @OneToMany(() => ActionAppletEntity, (action) => action.action)
  applets: ActionEntity[];
}
