import { Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { AppletConfigEntity, AppletEntity, ReactionEntity } from '@app/common';

@Entity('reaction_applet')
export class ReactionAppletEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => ReactionEntity, (reaction) => reaction.applets)
  reaction: ReactionEntity;

  @ManyToOne(() => AppletEntity, (applet) => applet.reactions)
  applet: AppletEntity;

  @OneToMany(() => AppletConfigEntity, (config) => config.actionApplet)
  configs: AppletConfigEntity[];
}
