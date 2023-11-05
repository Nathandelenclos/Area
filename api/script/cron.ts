import { Channel, connect } from 'amqplib';
import * as process from 'process';

const USER = process.argv[2] || process.env.RABBITMQ_USER;
const PASSWORD = process.argv[3] || process.env.RABBITMQ_PASS;
const HOST = process.argv[4] || process.env.RABBITMQ_HOST;
const INTERVAL = +process.argv[5] || +process.env.CRON_INTERVAL || 1000;

const EVERY_SECOND = 1000;
const EVERY_MINUTE = EVERY_SECOND * 60;
const EVERY_HOUR = EVERY_MINUTE * 60;
const EVERY_DAY = EVERY_HOUR * 24;

if (!USER || !PASSWORD || !HOST) {
  console.error('Missing required environment variables.');
  process.exit(1);
}

type Queue =
  | 'discord_queue'
  | 'spotify_queue'
  | 'instagram_queue'
  | 'gmail_queue'
  | 'youtube_queue'
  | 'google_drive_queue'
  | 'timer_queue'
  | 'news_queue'
  | 'slack_queue'
  | 'teams_queue'
  | 'weather_queue'
  | 'facebook_queue'
  | 'google_queue'
  | 'github_queue';
type QueueDefinition = {
  name: Queue;
  channel?: Channel;
  cmd: string;
  data?: any;
  interval?: number;
};

const QUEUES: QueueDefinition[] = [
  { name: 'discord_queue', cmd: 'cron' },
  { name: 'spotify_queue', cmd: 'cron' },
  { name: 'instagram_queue', cmd: 'cron' },
  { name: 'gmail_queue', cmd: 'cron' },
  { name: 'youtube_queue', cmd: 'cron' },
  { name: 'google_drive_queue', cmd: 'cron' },
  { name: 'timer_queue', cmd: 'cron' },
  { name: 'news_queue', cmd: 'cron', interval: EVERY_HOUR / 5 },
  { name: 'weather_queue', cmd: 'cron', interval: EVERY_HOUR / 5 },
  { name: 'github_queue', cmd: 'cron' },
  { name: 'facebook_queue', cmd: 'cron', interval: EVERY_MINUTE },
  { name: 'slack_queue', cmd: 'cron' },
  { name: 'google_queue', cmd: 'cron' },
  { name: 'teams_queue', cmd: 'cron' },
];

/**
 * Send a request to a queue.
 * @param ch Channel
 * @param queue Queue
 * @param cmd Command
 * @param data Data
 */
const sendRequest = (ch: Channel, queue: Queue, cmd: string, data: any) => {
  ch.sendToQueue(
    queue,
    Buffer.from(
      JSON.stringify({ pattern: { cmd: cmd }, data, id: '' }),
      'utf8',
    ),
  );
};

(async () => {
  console.log(`Connecting to amqp://${USER}:${PASSWORD}@${HOST}`);
  const conn = await connect(`amqp://${USER}:${PASSWORD}@${HOST}`);
  for (const queue of QUEUES) {
    queue.channel = await conn.createChannel();
    setInterval(() => {
      sendRequest(queue.channel, queue.name, queue.cmd, queue.data || {});
    }, queue.interval || INTERVAL);
  }
})();
