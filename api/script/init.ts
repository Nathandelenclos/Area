import { createConnection, ResultSetHeader } from 'mysql2';
import * as process from 'process';
import servicesJson from './services.json';

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

const services = servicesJson.services as unknown as Service[];
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
