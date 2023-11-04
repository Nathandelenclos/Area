import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { AppletEntity } from '@app/common/applets/applet.entity';
import { OauthEntity } from '@app/common/OAuth/oauth.entity';

@Entity('users')
export class UserEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  email: string;

  @Column({ nullable: true })
  password: string;

  @OneToMany(() => OauthEntity, (oauth) => oauth.user)
  oauth: OauthEntity[];

  @Column()
  name: string;

  @OneToMany(() => AppletEntity, (applet) => applet.user)
  applets: AppletEntity[];
}
