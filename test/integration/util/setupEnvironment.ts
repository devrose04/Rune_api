const { Sequelize } = require('sequelize');
const execa = require('execa');

async function waitForPostgresConnection(tries = 0, maxTries = 10) {
  const sequelize = new Sequelize('postgres://runesapi:runesapi@localhost:5432/runes', {
    logging: false,
  });

  try {
    await sequelize.authenticate();
    console.log('Postgres connection ready.');
  } catch {
    await new Promise((res, rej) =>
      setTimeout(async () => {
        const triesRemaining = maxTries - tries;

        if (triesRemaining < 1) {
          rej(`The connection did not become available after ${maxTries} tries.`);
        }

        if (tries === 0) {
          await execa('docker-compose up -d postgres', { shell: true });
        }

        console.log(
          `Postgres connection not ready. Retrying connection. ${maxTries - tries} tries remaining`
        );
        res(null);
      }, 1000)
    );
    await waitForPostgresConnection(++tries, maxTries);
  }
}

module.exports = async function () {
  console.log('\n');

  await waitForPostgresConnection(0, 15);

  await execa('NODE_ENV=development npx sequelize-cli db:migrate', { shell: true });
  await execa('NODE_ENV=development npx sequelize-cli db:seed:all;', { shell: true });

  console.log('Environment ready.\n\n');
};
