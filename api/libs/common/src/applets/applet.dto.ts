import { UserEntity } from '@app/common/users/user.entity';
import { ActionEntity } from '@app/common/actions/action.entity';
import { ReactionEntity } from '@app/common/reactions/reaction.entity';

export interface AppletDto {
  name: string;
  description: string;
  is_active: boolean;
  user: Partial<UserEntity>;
  color: string;
  actions?: Partial<ActionEntity>[];
  reactions?: Partial<ReactionEntity>[];
}
