import { Controller, Get } from '@nestjs/common';
import { GithubService } from './github.service';
import { MicroServiceController } from '@app/common';
import { Ctx, MessagePattern, RmqContext } from '@nestjs/microservices';

@Controller()
export class GithubController extends MicroServiceController {
  constructor(private readonly githubService: GithubService) {
    super();
  }

  @MessagePattern({ cmd: 'cron' })
  get(@Ctx() context: RmqContext) {
    this.ack(context);
    this.githubService.cron();
  }

  @MessagePattern({ cmd: 're_run_workflow' })
  runWorkflow(@Ctx() context: RmqContext) {
    const { workflow_id, oauth_id } = this.ack(context);
    this.githubService.runWorkflow(workflow_id, oauth_id);
  }

  @MessagePattern({ cmd: 'run_failed_workflow' })
  runFailedWorkflow(@Ctx() context: RmqContext) {
    const { workflow_id, oauth_id } = this.ack(context);
    this.githubService.runFailedWorkflow(workflow_id, oauth_id);
  }
}
