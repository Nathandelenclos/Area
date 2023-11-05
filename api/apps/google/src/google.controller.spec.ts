import { Test, TestingModule } from '@nestjs/testing';
import { GoogleController } from './google.controller';
import { GoogleService } from './google.service';

describe('GoogleController', () => {
  let googleController: GoogleController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [GoogleController],
      providers: [GoogleService],
    }).compile();

    googleController = app.get<GoogleController>(GoogleController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(googleController.getHello()).toBe('Hello World!');
    });
  });
});
