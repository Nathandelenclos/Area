import { Controller } from '@nestjs/common';
import { GoogleDriveService } from './google_drive.service';
import MicroServiceController from '@app/common/micro.service.controller';
import { Ctx, MessagePattern, RmqContext } from '@nestjs/microservices';

@Controller()
export class GoogleDriveController extends MicroServiceController {
  constructor(private readonly googleDriveService: GoogleDriveService) {
    super();
  }

  @MessagePattern({ cmd: 'cron' })
  get(@Ctx() context: RmqContext) {
    this.ack(context);
    this.googleDriveService.cron();
  }
}
