import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { AppletEntity } from '../applet.entity';

@Entity('applet_configs')
export class AppletConfigEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => AppletEntity, (applet) => applet.applet_configs)
  applet: AppletEntity;

  @Column()
  key: string;

  @Column()
  value: string;
}
