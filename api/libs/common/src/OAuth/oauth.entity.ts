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

  @Column({ nullable: true, length: 500 })
  accessToken: string;

  @Column({ length: 500 })
  refreshToken: string;

  @Column()
  providerId: string;

  @Column({ nullable: true })
  lastUpdate: Date;

  @Column()
  provider: string;
}
