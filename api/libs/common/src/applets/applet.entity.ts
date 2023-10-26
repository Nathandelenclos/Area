import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { UserEntity } from '@app/common/users/user.entity';
import { ActionEntity } from '@app/common/actions/action.entity';
import { ActionAppletEntity } from '@app/common/action-applet/action-applet.entity';
import { ReactionAppletEntity } from '@app/common/reaction-applet/reaction-applet.entity';

@Entity('applets')
export class AppletEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column()
  is_active: boolean;

  @ManyToOne(() => UserEntity, (user) => user.applets)
  user: UserEntity;

  @OneToMany(() => ActionAppletEntity, (action) => action.applet)
  actions: ActionEntity[];

  @OneToMany(() => ReactionAppletEntity, (reaction) => reaction.applet)
  reactions: ActionEntity[];
}
