import MicroServiceResponse from './micro.service.response';
import MicroServiceInit from './micro.service.init';
import MicroServiceController from './micro.service.controller';

import {
  OauthEntity,
  AppletConfigEntity,
  UserEntity,
  AppletEntity,
  ReactionEntity,
  ActionEntity,
  ServiceEntity,
} from '@app/common';

export * from './common.module';
export * from './common.service';

export * from './actions/action.dto';
export * from './actions/action.entity';
export * from './actions/action.module';
export * from './actions/action.service';

export * from './applets/applet.dto';
export * from './applets/applet.entity';
export * from './applets/applet.module';
export * from './applets/applet.service';

export * from './applets/configuration/applet.config.entity';
export * from './applets/configuration/applet.config.module';
export * from './applets/configuration/applet.config.service';

export * from './OAuth/oauth.dto';
export * from './OAuth/oauth.entity';
export * from './OAuth/oauth.module';
export * from './OAuth/oauth.service';

export * from './reactions/reaction.dto';
export * from './reactions/reaction.entity';
export * from './reactions/reaction.module';
export * from './reactions/reaction.service';

export * from './services/service.dto';
export * from './services/service.entity';
export * from './services/service.module';
export * from './services/service.service';

export * from './users/user.dto';
export * from './users/user.entity';
export * from './users/user.module';
export * from './users/user.service';

export * from './errors';
export * from './HttpCode';

export * from './micro.service.response';

const Entities = [
  UserEntity,
  ServiceEntity,
  ReactionEntity,
  ActionEntity,
  OauthEntity,
  AppletEntity,
  AppletConfigEntity,
];

export {
  MicroServiceResponse,
  MicroServiceInit,
  MicroServiceController,
  Entities,
};
