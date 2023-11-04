import { Injectable } from '@nestjs/common';

// TODO : REMOVE THIS !!!
const token =
  'AQAgRD0cEoyFXz-0g55SlfKRM6mKl1-df_8pWTmI2MUYurW2IeSIh3THFxNvwXTj9bxuPXW7S6lVp-uagM3ioiFdEg50wTyJ8njPV1o1C9vZyrmaLAElMFLGyL2x7NvZnWMV7MCDA2KWIm-BCkEJk3pSCLSlYyk0t-KLAOu_qc2WUnmi3AmMBWH9cgojQ8hbfZbIKqI_ogc1a1pDGcyz0Ky5QlZDNsBABHwR3rTzOnFNWM4KhkCMAH8ohvczAk_q_97njmfjTjWfIj3OAaiicSzKtyYr_7pn0pOUyHzE8ZEHp2FS3KwdyibNAc60k2tQApXxoUTK36-R';

@Injectable()
export class SpotifyService {
  async cron(): Promise<void> {
    this.onTrackStateChange();
  }

  /**
   * Trigger when a track change, or play/pause
   */
  async onTrackStateChange(): Promise<void> {
    console.log('-------------------');
    const currentTrack = await fetch(
      'https://api.spotify.com/v1/me/player/currently-playing',
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      },
    );
    console.log(currentTrack);
  }
}
