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
  token: string;

  @Column({ nullable: true })
  providerId: string;

  @Column({ nullable: true })
  provider: string;
}
