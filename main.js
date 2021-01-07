const app = require('./server');
const { db } = require('./server/db');
//const chalk = require('chalk');
const { dbStore } = require('./server/db');

//spin up the server, waiting for requests
const port = 3000;

async function run() {
  try {
    // console.log(chalk.green('dbStore synced'));
    await db.sync();
    //console.log(chalk.green('db synced'));
    app.listen(port, () => {
      //console.log(chalk.green(`listening on port ${port}`));
    });
  } catch (e) {
    throw e;
  }
}

run();
