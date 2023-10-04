import { Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('applet_reactions')
export class AppletReactionEntity {
  @PrimaryGeneratedColumn()
  id: number;

  // TODO Link to user, action
}
