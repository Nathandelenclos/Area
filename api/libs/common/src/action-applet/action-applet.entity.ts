import { Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { ActionEntity, AppletConfigEntity, AppletEntity } from '@app/common';

@Entity('action_applet')
export class ActionAppletEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => ActionEntity, (action) => action.applets)
  action: ActionEntity;

  @ManyToOne(() => AppletEntity, (applet) => applet.actions, {
    onDelete: 'CASCADE',
  })
  applet: AppletEntity;

  @OneToMany(() => AppletConfigEntity, (config) => config.actionApplet, {
    cascade: true,
  })
  configs: AppletConfigEntity[];
}
