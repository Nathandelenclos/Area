import { createConnection } from 'mysql2';
import * as process from 'process';

const needParams = {
  action: ['name', 'description', 'serviceId', 'is_available'],
  reaction: ['name', 'description', 'serviceId', 'is_available'],
  service: ['name', 'url', 'is_available'],
};

const args = process.argv.slice(2);

if (needParams[args[0]] === undefined) {
  console.error('Usage: Action, ReactionInterface, ServiceInterface');
  process.exit(84);
}
if (args.length != needParams[args[0]].length + 1) {
  console.error(`Usage: ${args[0]} ${needParams[args[0]].join(', ')}`);
  process.exit(84);
}

const connection = createConnection({
  host: 'localhost',
  port: 3306,
  user: 'root',
  password: 'root',
  database: 'area',
});

connection.execute(
  `INSERT INTO ${args[0]} (${needParams[args[0]].join(
    ', ',
  )}) VALUES (${needParams[args[0]].map(() => '?').join(', ')});`,
  args.slice(1),
  function (err, results, fields) {
    if (err) {
      console.error(err);
      process.exit(84);
    }
    console.log(results);
    process.exit(0);
  },
);
