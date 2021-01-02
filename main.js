const app = require('./server');
const { db } = require('./server/db');
const chalk = require('chalk');

//spin up the server, waiting for requests
const port = 3000;

db.sync().then(() => {
  console.log(chalk.green('db synced'));
  app.listen(port, () => {
    console.log(chalk.green(`listening on port ${port}`));
  });
});
