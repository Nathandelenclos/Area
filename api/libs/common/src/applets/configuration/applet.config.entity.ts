import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { ActionAppletEntity } from '@app/common/action-applet/action-applet.entity';
import { ReactionAppletEntity } from '@app/common/reaction-applet/reaction-applet.entity';

@Entity('applet_configs')
export class AppletConfigEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => ActionAppletEntity, (actionApplet) => actionApplet.configs, {
    nullable: true,
  })
  actionApplet: ActionAppletEntity;

  @ManyToOne(
    () => ReactionAppletEntity,
    (reactionApplet) => reactionApplet.configs,
    {
      nullable: true,
    },
  )
  reactionApplet: ReactionAppletEntity;

  @Column()
  key: string;

  @Column()
  value: string;
}
