const dotenv = require('dotenv');

dotenv.config();

['NODE_ENV', 'PORT', 'MONGO_URL', 'MONGO_USERNAME', 'MONGO_PASSWORD', 'MONGO_DB_NAME', 'REDIS_HOST', 'REDIS_PORT'].forEach((name) => {
  if (Object.keys(process.env).indexOf(name) < 0) {
    throw new Error(`Environment variable ${name} is missing`);
  }
});

const config = {
  env: process.env.NODE_ENV.toLowerCase(),
  logger: {
    level: process.env.LOG_LEVEL || 'info',
    file: process.env.LOG_FILE || '../service.log',
  },
  documentation: {
    swagger: {
      info: {
        title: 'URL Shortener Swagger',
        description: 'URL Shortener Documentation',
      },
      consumes: ['application/json'],
      produces: ['application/json'],
    },
    exposeRoute: true,
  },
  server: {
    port: Number(process.env.PORT),
  },
  db: {
    mongodb: {
      url: process.env.MONGO_URL,
      username: process.env.MONGO_USERNAME,
      password: process.env.MONGO_PASSWORD,
      name: process.env.MONGO_DB_NAME,
    },
    redis: {
      host: process.env.REDIS_HOST,
      port: process.env.REDIS_PORT,
    },
  },
  tokenExpiry: process.env.TOKEN_EXPIRY ? Number(process.env.TOKEN_EXPIRY) : 1 * 60 * 60, // seconds
  jwtKey: process.env.JWT_KEY,
};

module.exports = config;
