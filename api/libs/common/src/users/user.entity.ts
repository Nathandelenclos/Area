import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { AppletEntity } from '@app/common/applets/applet.entity';

@Entity('users')
export class UserEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  email: string;

  @Column({ nullable: true })
  password: string;

  @Column()
  name: string;

  @OneToMany(() => AppletEntity, (applet) => applet.user)
  applets: AppletEntity[];
}
