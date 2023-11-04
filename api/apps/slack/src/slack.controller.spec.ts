import { Test, TestingModule } from '@nestjs/testing';
import { SlackController } from './slack.controller';
import { SlackService } from './slack.service';

describe('SlackController', () => {
  let slackController: SlackController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [SlackController],
      providers: [SlackService],
    }).compile();

    slackController = app.get<SlackController>(SlackController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(slackController.getHello()).toBe('Hello World!');
    });
  });
});
