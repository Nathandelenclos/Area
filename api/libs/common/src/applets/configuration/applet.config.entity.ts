import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { AppletEntity } from '../applet.entity';
import { ReactionEntity } from '@app/common/reactions/reaction.entity';
import { ActionEntity } from '@app/common/actions/action.entity';

@Entity('applet_configs')
export class AppletConfigEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => AppletEntity, (applet) => applet.applet_configs)
  applet?: AppletEntity;

  @ManyToOne(() => ReactionEntity, (reaction) => reaction.reaction_configs)
  reaction?: ReactionEntity;

  @ManyToOne(() => ActionEntity, (action) => action.action_configs)
  action?: ActionEntity;

  @Column()
  key: string;

  @Column()
  value: string;
}
