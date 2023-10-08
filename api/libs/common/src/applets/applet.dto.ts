import { UserEntity } from '@app/common/users/user.entity';
import { DeepPartial } from 'typeorm';
import { ActionEntity } from '@app/common/actions/action.entity';

export interface AppletDto {
  id: number;
  name: string;
  description: string;
  is_active: boolean;
  config: any;
}

export interface AppletCreateDto extends AppletDto {
  action?: DeepPartial<ActionEntity>;
  reactions?: DeepPartial<ActionEntity>[];
  user?: DeepPartial<UserEntity>;
}
