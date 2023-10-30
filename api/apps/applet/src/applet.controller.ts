import { Controller } from '@nestjs/common';
import {
  ActionAppletService,
  AppletService as AppletCommonService,
  HttpCode,
  MicroServiceController,
  MicroServiceHttpCodeProps,
  MicroServiceResponse,
  ReactionAppletService,
  ValidationError,
  ForbiddenError,
} from '@app/common';
import { Ctx, MessagePattern, RmqContext } from '@nestjs/microservices';
import { AppletService } from './applet.service';

@Controller()
export class AppletController extends MicroServiceController {
  constructor(
    private readonly appletService: AppletService,
    private readonly appletCommonService: AppletCommonService,
    private readonly reactionService: ReactionAppletService,
    private readonly actionService: ActionAppletService,
  ) {
    super();
  }

  @MessagePattern({ cmd: 'findAll' })
  async findAll(@Ctx() context: RmqContext) {
    const data = this.ack(context);
    const props: MicroServiceHttpCodeProps = {
      code: HttpCode.OK,
      message: 'OK',
    };
    try {
      props.data = await this.appletService.getAllApplets(data.user.id);
    } catch (error) {
      props.code = HttpCode.INTERNAL_SERVER_ERROR;
      props.message = 'Internal server error';
    }
    return new MicroServiceResponse(props);
  }

  @MessagePattern({ cmd: 'findById' })
  async findById(@Ctx() context: RmqContext) {
    const { id, user } = this.ack(context);
    const props: MicroServiceHttpCodeProps = {
      code: HttpCode.OK,
      message: 'OK',
    };
    try {
      props.data = await this.appletService.getAppletById(id, user.id);
    } catch (error) {
      if (error instanceof ForbiddenError) {
        props.code = HttpCode.FORBIDDEN;
        props.message = error.message;
      } else {
        props.code = HttpCode.INTERNAL_SERVER_ERROR;
        props.message = 'Internal server error';
      }
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
      props.data = await this.appletService.createApplet(data, data.user);
    } catch (e) {
      console.log(e);
      if (e instanceof ValidationError) {
        props.code = HttpCode.BAD_REQUEST;
        props.message = e.message;
        props.data = e.fields;
      } else {
        props.code = HttpCode.INTERNAL_SERVER_ERROR;
        props.message = e.message || 'Internal server error';
      }
    }
    return new MicroServiceResponse(props);
  }

  @MessagePattern({ cmd: 'test' })
  async test(@Ctx() context: RmqContext) {
    const data = this.ack(context);
    const props: MicroServiceHttpCodeProps = {
      code: HttpCode.OK,
      message: 'OK',
    };
    try {
      props.data = await this.appletCommonService.create(data);
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
      props.data = await this.appletService.deleteApplet(data.id, data.user.id);
    } catch (e) {
      props.code = HttpCode.INTERNAL_SERVER_ERROR;
      props.message = e.message || 'Internal server error';
    }
    return new MicroServiceResponse(props);
  }

  @MessagePattern({ cmd: 'update' })
  async update(@Ctx() context: RmqContext) {
    const { id, user, ...data } = this.ack(context);
    const props: MicroServiceHttpCodeProps = {
      code: HttpCode.OK,
      message: 'OK',
    };
    try {
      props.data = await this.appletService.updateApplet(id, data, user.id);
    } catch (e) {
      props.code = HttpCode.INTERNAL_SERVER_ERROR;
      props.message = e.message || 'Internal server error';
    }
    return new MicroServiceResponse(props);
  }
}
