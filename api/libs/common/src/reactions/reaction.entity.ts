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
import { ReactionAppletEntity } from '@app/common/reaction-applet/reaction-applet.entity';

@Entity('reaction')
export class ReactionEntity {
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

  @Column()
  cmd: string;

  @ManyToOne(() => ServiceEntity, (service) => service.reactions)
  service: ServiceEntity;

  @OneToMany(
    () => AppletRequiredConfigEntity,
    (appletReactionConfig) => appletReactionConfig.reaction,
  )
  config: AppletRequiredConfigEntity[];

  @OneToMany(() => ReactionAppletEntity, (reaction) => reaction.reaction)
  reactionApplets: ReactionAppletEntity[];
}
