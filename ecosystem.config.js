const pkg = require('./package.json');

module.exports = {
  apps : [{
    name: 'watchmen-monitor-server',
    script: 'run-monitor-server.js'
  }, {
    name: 'watchmen-web-server',
    script: 'run-web-server.js',
    env: {
      WATCHMEN_WEB_PORT: '3102'
    },
    env_test: {
      NODE_ENV: 'test',
      WATCHMEN_WEB_PORT: '3101'
    }
    env_production: {
      NODE_ENV: 'production',
      WATCHMEN_BASE_URL: 'https://app.opennet.cz/watchmen/',
      WATCHMEN_WEB_PORT: '3100'
    }
  }],
  deploy: {
    stage: {
      user: 'app',
      host: '192.168.200.42',
      ref: 'origin/master',
      repo: pkg.repository.url,
      path: '/usr/local/app/' + pkg.name + '/test',
      'post-deploy': 'npm install && gulp build && pm2 startOrGracefulReload ecosystem.config.js --env test',
      env: {
        NODE_ENV: 'test'
      }
    }
    production: {
      user: 'app',
      host: '192.168.200.42',
      ref: 'origin/master',
      repo: pkg.repository.url,
      path: '/usr/local/app/' + pkg.name + '/production',
      'post-deploy': 'npm install && gulp build && pm2 startOrGracefulReload ecosystem.config.js --env production',
      env: {
        NODE_ENV: 'production'
      }
    }
  }
};

