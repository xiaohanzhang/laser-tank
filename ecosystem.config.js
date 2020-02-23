module.exports = {
  apps : [{
    name: 'laser-tank-client',
    script: './node_modules/.bin/react-scripts',
    args: 'start',
    instances: 1,
    autorestart: true,
    watch: false,
    max_memory_restart: '1G',
    env: {
      NODE_ENV: 'development',
      PORT: '3006'
    },
    env_production: {
      NODE_ENV: 'production'
    }
  }, {
    name: 'laser-tank-server-typescript',
    script: './node_modules/.bin/tsc',
    args: '-w -p server',
  }, {
    name: 'laser-tank-server',
    script: './dist/server.js',
    watch: ['dist'],
  }],
};
