const pkg = require('./package.json');
const path = require('path');

const _env = [];
const _env_production = [];

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
  WATCHMEN_AUTH_NODEMAILER_SENDMAIL: 'true',
  WATCHMEN_MAILER_TEMPLATE_DIRECTORY: path.join(__dirname, 'webserver/views/nodemailer')
}

for (var key in env) {
  _env.push('export ' + key + '=' + env[key] + ' && ');
  _env_production.push('export ' + key + '="' + env[key] + '" && ');
}

for (var key in env_production) {
  _env_production.push('export ' + key + '="' + env_production[key] + '" && ');
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
      'post-deploy': + _env_production.join('') + ' npm install && bower --allow-root install && gulp build && pm2 startOrGracefulReload ecosystem.config.js --env production'
    }
  }
};
