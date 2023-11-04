import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { ReactionEntity } from '@app/common/reactions/reaction.entity';
import { ActionEntity } from '@app/common/actions/action.entity';

@Entity('applet_required_configs')
export class AppletRequiredConfigEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => ReactionEntity, (reaction) => reaction.config)
  reaction?: ReactionEntity;

  @ManyToOne(() => ActionEntity, (action) => action.config)
  action?: ActionEntity;

  @Column({ default: 'Unnamed Configuration' })
  name: string;

  @Column({ default: 'No description' })
  description: string;

  @Column()
  key: string;

  @Column()
  type: string;
}
