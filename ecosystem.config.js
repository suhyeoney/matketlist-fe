module.exports = {
  apps: [
    {
      name: 'matket-list-app',
      script: 'npm',
      args: 'run start',
      instances: 2,
      autorestart: true,
      watch: false,
      env: {
        PORT: 3000,
        NODE_ENV: 'production'
      },
      env_production: {
        PORT: 3000,
        NODE_ENV: 'production',
      },
      output: "./logs/console.log",
      error: "./logs/consoleError.log",
    },
  ],
};