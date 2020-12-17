module.exports = async function () {
  const execa = require('execa');
  await execa('docker-compose down', { shell: true });

  console.log('Environment successfully taken down.\n');
};
