import { UserEntity } from '@app/common/users/user.entity';
import { DeepPartial } from 'typeorm';

export interface AppletDto {
  id: number;
  name: string;
  description: string;
  is_active: boolean;
  config: any;
  user_id?: DeepPartial<UserEntity>;
}
