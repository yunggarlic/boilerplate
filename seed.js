const { green, red } = require('chalk');
const { db, User } = require('./server/db');

const users = [
  {
    email: 'ferrari.tim.v@gmail.com',
    password: 'fuckyou2',
  },
];

const seed = async () => {
  try {
    await db.sync({
      force: true,
    });
    await Promise.all(
      users.map((user) => {
        return User.create(user);
      })
    );
  } catch (error) {
    console.log(error);
  }
};

module.exports = seed;

if (require.main === module) {
  seed()
    .then(() => {
      console.log(green('Seeding success!'));
      db.close();
    })
    .catch((err) => {
      console.error(red('Oh noes! Something went wrong!'));
      console.error(err);
      db.close();
    });
}
