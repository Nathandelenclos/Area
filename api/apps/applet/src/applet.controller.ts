import { Controller } from '@nestjs/common';
import {
  ActionAppletService,
  AppletRelations,
  AppletService as AppletCommonService,
  HttpCode,
  MicroServiceController,
  MicroServiceHttpCodeProps,
  MicroServiceResponse,
  ReactionAppletService,
  UserEntity,
} from '@app/common';
import { Ctx, MessagePattern, RmqContext } from '@nestjs/microservices';
import { DeepPartial } from 'typeorm';

@Controller()
export class AppletController extends MicroServiceController {
  constructor(
    private readonly appletService: AppletCommonService,
    private readonly reactionService: ReactionAppletService,
    private readonly actionService: ActionAppletService,
  ) {
    super();
  }

  @MessagePattern({ cmd: 'findById' })
  async findById(@Ctx() context: RmqContext) {
    const { id } = this.ack(context);
    const props: MicroServiceHttpCodeProps = {
      code: HttpCode.OK,
      message: 'OK',
    };
    try {
      props.data = await this.appletService.findOne({ id: id }, [
        AppletRelations.REACTIONS,
        AppletRelations.USER,
        AppletRelations.SERVICE,
      ]);
    } catch (error) {
      props.code = HttpCode.INTERNAL_SERVER_ERROR;
      props.message = 'Internal server error';
    }
    return new MicroServiceResponse(props);
  }

  @MessagePattern({ cmd: 'create' })
  async create(@Ctx() context: RmqContext) {
    const data = this.ack(context);
    const props: MicroServiceHttpCodeProps = {
      code: HttpCode.OK,
      message: 'OK',
    };
    try {
      props.data = await this.appletService.create(
        data,
        data.user.id as DeepPartial<UserEntity>,
        data.service,
        data.reaction,
        data.action,
      );
    } catch (e) {
      props.code = HttpCode.INTERNAL_SERVER_ERROR;
      props.message = 'Internal server error';
    }
    return new MicroServiceResponse(props);
  }

  @MessagePattern({ cmd: 'delete' })
  async delete(@Ctx() context: RmqContext) {
    const data = this.ack(context);
    const props: MicroServiceHttpCodeProps = {
      code: HttpCode.OK,
      message: 'OK',
    };
    try {
      props.data = await this.appletService.delete(data.id, data.user.id);
    } catch (e) {
      props.code = HttpCode.INTERNAL_SERVER_ERROR;
      props.message = 'Internal server error';
    }
    return new MicroServiceResponse(props);
  }

  @MessagePattern({ cmd: 'test' })
  async test(@Ctx() context: RmqContext) {
    const props: MicroServiceHttpCodeProps = {
      code: HttpCode.OK,
      message: 'OK',
    };
    try {
      props.data = await this.appletService.findAll([
        AppletRelations.USER,
        AppletRelations.SERVICE,
        AppletRelations.ACTIONS,
        AppletRelations.REACTIONS,
        AppletRelations.ACTIONS_CONFIG,
        AppletRelations.REACTION_CONFIG,
      ]);
    } catch (e) {
      props.code = HttpCode.INTERNAL_SERVER_ERROR;
      props.message = 'Internal server error';
    }
    return new MicroServiceResponse(props);
  }
}
