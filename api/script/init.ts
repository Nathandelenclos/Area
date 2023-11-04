import { createConnection, ResultSetHeader } from 'mysql2';
import * as process from 'process';

const connection = createConnection({
  host: 'localhost',
  port: 3306,
  user: 'root',
  password: 'root',
  database: 'area',
});

interface Config {
  name: string;
  description: string;
  key: string;
  type: string;
}

interface Action {
  id?: number;
  name: string;
  description: string;
  key: string;
  serviceId?: number;
  is_available: number;
  config?: Config[];
}

interface Reaction {
  id?: number;
  name: string;
  description: string;
  key: string;
  serviceId?: number;
  is_available: number;
  cmd: string;
  config?: Config[];
}

interface Service {
  id?: number;
  name: string;
  url: string;
  is_available: number;
  rmq_queue: string;
  key: string;
  actions: Action[];
  reactions: Reaction[];
}

const services: Service[] = [
  {
    name: 'Discord',
    url: '',
    is_available: 1,
    rmq_queue: 'discord_queue',
    key: 'discord',
    actions: [],
    reactions: [
      {
        name: 'Discord Message',
        description: 'Send a message to a channel',
        key: 'discord_message',
        is_available: 1,
        cmd: 'send_message',
        config: [
          {
            name: 'Webhook URL',
            description: 'Webhook URL',
            key: 'webhook',
            type: 'string',
          },
          {
            name: 'Message',
            description: 'Message to send',
            key: 'message',
            type: 'string',
          },
        ],
      },
    ],
  },
  {
    name: 'Timer',
    url: '',
    is_available: 1,
    rmq_queue: 'timer_queue',
    key: 'timer',
    actions: [
      {
        name: 'At Date',
        description: 'Trigger at a specific date',
        key: 'at_date',
        is_available: 1,
        config: [
          {
            name: 'Date',
            description: 'Date to trigger',
            key: 'date',
            type: 'date',
          },
        ],
      },
      {
        name: 'At Cron',
        description: 'Execute something from a specific date every delta time',
        key: 'at_cron',
        is_available: 1,
        config: [
          {
            name: 'Date',
            description: 'Time to start the cron',
            key: 'last_exec',
            type: 'date',
          },
          {
            name: 'Delta',
            description: 'Delta time between each execution',
            key: 'delta',
            type: 'number',
          },
        ],
      },
    ],
    reactions: [],
  },
  {
    name: 'News',
    url: '',
    is_available: 1,
    rmq_queue: 'news_queue',
    key: 'news',
    actions: [
      {
        name: 'On new NYT article',
        description: 'Trigger when a new article is published on NYT',
        key: 'nyt_article',
        is_available: 1,
      },
    ],
    reactions: [],
  },
];

function execute(table: string, data: any): Promise<ResultSetHeader> {
  return new Promise((resolve, reject) => {
    const request = `INSERT INTO ${table} (\`${Object.keys(data).join(
      '`, `',
    )}\`) VALUES (${Object.keys(data)
      .map(() => '?')
      .join(', ')});`;
    connection.execute(
      request,
      Object.values(data),
      (err, results: ResultSetHeader) => {
        if (err) {
          reject(err);
        }
        resolve(results);
      },
    );
  });
}

async function init() {
  for (const service of services) {
    const serviceData = { ...service };
    delete serviceData.actions;
    delete serviceData.reactions;

    const data = await execute('service', serviceData);
    service.id = data.insertId;

    for (const action of service.actions) {
      const actionData = { ...action };
      delete actionData.config;

      const actionResponse = await execute('action', {
        ...actionData,
        serviceId: service.id,
      });

      if (!action.config) continue;
      for (const config of action.config) {
        await execute('applet_required_configs', {
          ...config,
          actionId: actionResponse.insertId,
        });
      }
    }
    for (const reaction of service.reactions) {
      const reactionData = { ...reaction };
      delete reactionData.config;

      const reactionResponse = await execute('reaction', {
        ...reactionData,
        serviceId: service.id,
      });

      if (!reaction.config) continue;
      for (const config of reaction.config) {
        await execute('applet_required_configs', {
          ...config,
          reactionId: reactionResponse.insertId,
        });
      }
    }
  }
}

init()
  .then(() => connection.end())
  .then(() => process.exit(0));
