import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { ActionEntity } from '@app/common/actions/action.entity';
import { ReactionEntity } from '@app/common/reactions/reaction.entity';

@Entity('service')
export class ServiceEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  key: string;

  @Column()
  name: string;

  @Column()
  url: string;

  @Column()
  is_available: boolean;

  @Column()
  rmq_queue: string;

  @OneToMany(() => ActionEntity, (action) => action.service)
  actions: ActionEntity[];

  @OneToMany(() => ReactionEntity, (reaction) => reaction.service)
  reactions: ReactionEntity[];
}
