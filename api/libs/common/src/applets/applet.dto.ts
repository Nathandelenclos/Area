import { UserEntity } from '@app/common/users/user.entity';
import { DeepPartial } from 'typeorm';
import { ActionEntity } from '@app/common/actions/action.entity';
import { ReactionEntity } from '@app/common/reactions/reaction.entity';
import { ServiceEntity } from '@app/common/services/service.entity';

export interface AppletDto {
  name: string;
  description: string;
  is_active: boolean;
  user: Partial<UserEntity>;
  actions?: Partial<ActionEntity>[];
  reactions?: Partial<ReactionEntity>[];
}
