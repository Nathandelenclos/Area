import { Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { ActionEntity, AppletConfigEntity, AppletEntity } from '@app/common';

@Entity('action_applet')
export class ActionAppletEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => ActionEntity, (action) => action.actionApplets)
  action: ActionEntity;

  @ManyToOne(() => AppletEntity, (applet) => applet.actionApplets)
  applet: AppletEntity;

  @OneToMany(() => AppletConfigEntity, (config) => config.actionApplet)
  configs: AppletConfigEntity[];
}
