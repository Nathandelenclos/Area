import { createConnection, ResultSetHeader } from 'mysql2';
import * as process from 'process';

const connection = createConnection({
  host: 'localhost',
  port: 3306,
  user: 'root',
  password: 'root',
  database: 'area',
});

interface Action {
  id?: number;
  name: string;
  description: string;
  key: string;
  serviceId?: number;
  is_available: number;
}

interface Reaction {
  id?: number;
  name: string;
  description: string;
  key: string;
  serviceId?: number;
  is_available: number;
  cmd: string;
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
      },
      {
        name: 'At Cron',
        description: 'Execute something from a specific date every delta time',
        key: 'at_cron',
        is_available: 1,
      },
    ],
    reactions: [],
  },
];

function execute(table: string, data: any): Promise<ResultSetHeader> {
  console.log(data);
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
      await execute('action', {
        ...action,
        serviceId: service.id,
      });
    }
    for (const reaction of service.reactions) {
      await execute('reaction', {
        ...reaction,
        serviceId: service.id,
      });
    }
  }
}

init()
  .then(() => connection.end())
  .then(() => process.exit(0));
