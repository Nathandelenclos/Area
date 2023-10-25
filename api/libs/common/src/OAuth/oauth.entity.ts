import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { UserEntity } from '@app/common/users/user.entity';

@Entity('oauth')
export class OauthEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => UserEntity, (user) => user.oauth)
  user: UserEntity;

  @Column()
  email: string;

  @Column({ nullable: true })
  accessToken: string;

  @Column()
  refreshToken: string;

  @Column()
  providerId: string;

  @Column({ nullable: true })
  lastUpdate: Date;

  @Column()
  provider: string;
}
