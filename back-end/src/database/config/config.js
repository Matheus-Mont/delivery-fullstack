require('dotenv').config();

const environment = process.env.NODE_ENV || 'test';

const suffix = {
  prod: '',
  production: '',
  dev: '-dev',
  development: '-dev',
  test: '-test',
};

const dbSuffix = Object.prototype.hasOwnProperty.call(suffix, environment)
  ? suffix[environment]
  : suffix.test;

const buildSsl = () => {
  if (process.env.MYSQL_SSL_CA) {
    return { ca: process.env.MYSQL_SSL_CA, rejectUnauthorized: true };
  }
  if (process.env.MYSQL_SSL === 'true') {
    return { rejectUnauthorized: false };
  }
  return undefined;
};

const ssl = buildSsl();

const options = {
  host: process.env.MYSQL_HOST || 'localhost',
  port: process.env.MYSQL_PORT || '3306',
  database: `${process.env.MYSQL_DB_NAME || 'delivery-app'}${dbSuffix}`,
  username: process.env.MYSQL_USER || 'root',
  password: process.env.MYSQL_PASSWORD || 'password',
  dialect: 'mysql',
  dialectModule: require('mysql2'),
  dialectOptions: {
    timezone: 'Z',
    ...(ssl ? { ssl } : {}),
  },
  pool: {
    max: Number(process.env.MYSQL_POOL_MAX || 2),
    min: 0,
    idle: 10000,
    acquire: 30000,
  },
  logging: false,
};

const fromUrl = process.env.DATABASE_URL
  ? { use_env_variable: 'DATABASE_URL' }
  : {};

module.exports = {
  development: {
    ...options,
  },
  test: {
    ...options,
  },
  production: {
    ...options,
    ...fromUrl,
  },
};
