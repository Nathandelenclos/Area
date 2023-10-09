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

  @Column({ nullable: true })
  google_token: string;

  @Column({ nullable: true })
  facebook_token: string;

  @Column({ nullable: true })
  github_token: string;

  @OneToMany(() => AppletEntity, (applet) => applet.user)
  applets: AppletEntity[];
}
