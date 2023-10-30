import { Controller } from '@nestjs/common';
import { Ctx, MessagePattern, RmqContext } from '@nestjs/microservices';
import {
  MicroServiceController,
  MicroServiceHttpCodeProps,
  MicroServiceResponse,
  ServiceRelations,
  ServiceService as ServiceCommonService,
} from '@app/common';

@Controller()
export class ServiceController extends MicroServiceController {
  constructor(private readonly serviceService: ServiceCommonService) {
    super();
  }

  @MessagePattern({ cmd: 'getServices' })
  async getServices() {
    let props: MicroServiceHttpCodeProps = {
      code: 200,
      message: 'OK',
    };
    try {
      props.data = await this.serviceService.findAll([
        ServiceRelations.ACTIONS,
        ServiceRelations.REACTIONS,
      ]);
    } catch (error) {
      props = {
        code: 500,
        message: 'Internal server error' || error.message,
      };
    }
    return new MicroServiceResponse(props);
  }

  @MessagePattern({ cmd: 'getService' })
  async getService(@Ctx() context: RmqContext) {
    const { id } = this.ack(context);
    let props: MicroServiceHttpCodeProps = {
      code: 200,
      message: 'OK',
    };
    try {
      props.data = await this.serviceService.findOne({ id }, [
        ServiceRelations.ACTIONS,
        ServiceRelations.REACTIONS,
      ]);
    } catch (error) {
      props = {
        code: 500,
        message: 'Internal server error',
      };
    }
    return new MicroServiceResponse(props);
  }

  @MessagePattern({ cmd: 'getAction' })
  async getAction(@Ctx() context: RmqContext) {
    const { id } = this.ack(context);
    let props: MicroServiceHttpCodeProps = {
      code: 200,
      message: 'OK',
    };
    try {
      props.data = (
        await this.serviceService.findOne({ id }, [
          ServiceRelations.ACTIONS,
          ServiceRelations.ACTION_CONFIG,
        ])
      ).actions;
    } catch (error) {
      props = {
        code: 500,
        message: 'Internal server error',
      };
    }
    return new MicroServiceResponse(props);
  }

  @MessagePattern({ cmd: 'getReaction' })
  async getReaction(@Ctx() context: RmqContext) {
    const { id } = this.ack(context);
    let props: MicroServiceHttpCodeProps = {
      code: 200,
      message: 'OK',
    };
    try {
      props.data = (
        await this.serviceService.findOne({ id }, [
          ServiceRelations.REACTIONS,
          ServiceRelations.REACTION_CONFIG,
        ])
      ).reactions;
    } catch (error) {
      props = {
        code: 500,
        message: 'Internal server error',
      };
    }
    return new MicroServiceResponse(props);
  }
}
