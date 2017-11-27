const pkg = require('./package.json');

module.exports = {
  apps : [{
    name: 'watchmen-monitor-server',
    script: 'run-monitor-server.js'
  }, {
    name: 'watchmen-web-server',
    script: 'run-web-server.js',
    env: {
      NODE_ENV: 'development',
    },
    env_production: {
      NODE_ENV: 'production',
      WATCHMEN_BASE_URL: 'https://app.opennet.cz/' + pkg.name  + '/',
      WATCHMEN_WEB_PORT: 3100
    }
  }],
  deploy: {
    production: {
      user: 'app',
      host: '192.168.200.42',
      ref: 'origin/master',
      repo: pkg.repository.url,
      path: '/usr/local/app/' + pkg.name,
      'post-deploy': 'npm install && bower --allow-root install && gulp build && pm2 startOrGracefulReload ecosystem.config.js --env production',
      env: {
        NODE_ENV: 'production'
      }
    }
  }
};

