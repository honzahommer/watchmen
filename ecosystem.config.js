const pkg = require('./package.json');
const path = require('path');

const env = {
  NODE_ENV: 'development',
  WATCHMEN_BASE_URL: 'http://localhost/' + pkg.name  + '/',
  WATCHMEN_WEB_NO_AUTH: 'true',
  WATCHMENT_AUTH_NODEMAILER_NO_AUTH: 'true'
}

const env_production = {
  NODE_ENV: 'production',
  WATCHMEN_BASE_URL: 'https://app.opennet.cz/' + pkg.name  + '/',
  WATCHMEN_WEB_PORT: '3100',
  WATCHMEN_AUTH_NODEMAILER_USER: 'root@cap-net.cz',
  WATCHMEN_AUTH_NODEMAILER_SENDMAIL: 'true'
}

module.exports = {
  apps : [{
    name: pkg.name + '-monitor-server',
    script: 'run-monitor-server.js',
    env, env_production
  }, {
    name: pkg.name + '-web-server',
    script: 'run-web-server.js',
    env, env_production
  }],
  deploy: {
    production: {
      user: 'app',
      host: '192.168.200.42',
      ref: 'origin/master',
      repo: pkg.repository.url,
      path: '/usr/local/app/' + pkg.name,
      env: env_production
    }
  }
};
