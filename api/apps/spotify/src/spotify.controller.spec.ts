import { Test, TestingModule } from '@nestjs/testing';
import { SpotifyController } from './spotify.controller';
import { SpotifyService } from './spotify.service';

describe('SpotifyController', () => {
  let spotifyController: SpotifyController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [SpotifyController],
      providers: [SpotifyService],
    }).compile();

    spotifyController = app.get<SpotifyController>(SpotifyController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(spotifyController.getHello()).toBe('Hello World!');
    });
  });
});
