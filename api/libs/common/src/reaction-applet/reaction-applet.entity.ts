import { Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { AppletConfigEntity, AppletEntity, ReactionEntity } from '@app/common';

@Entity('reaction_applet')
export class ReactionAppletEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => ReactionEntity, (reaction) => reaction.reactionApplets)
  reaction: ReactionEntity;

  @ManyToOne(() => AppletEntity, (applet) => applet.reactionApplets)
  applet: AppletEntity;

  @OneToMany(() => AppletConfigEntity, (config) => config.actionApplet)
  configs: AppletConfigEntity[];
}
