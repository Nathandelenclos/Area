import { Channel, connect } from 'amqplib';
import * as process from 'process';

const USER = process.argv[2] || process.env.RABBITMQ_USER;
const PASSWORD = process.argv[3] || process.env.RABBITMQ_PASS;
const HOST = process.argv[4] || process.env.RABBITMQ_HOST;
const INTERVAL = +process.argv[5] || +process.env.CRON_INTERVAL || 1000;

type Queue = 'discord_queue' | 'cron_queue';
type QueueDefinition = {
  name: Queue;
  channel?: Channel;
  cmd: string;
  data?: any;
  interval?: number;
};

const QUEUES: QueueDefinition[] = [
  { name: 'discord_queue', cmd: 'test' },
  { name: 'cron_queue', cmd: 'test' },
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
