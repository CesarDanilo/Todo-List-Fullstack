const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '../../../.env') });

// Função para extrair configurações da DATABASE_URL (formato comum no Railway)
const parseDbUrl = (url) => {
  if (!url) return {};

  try {
    const parsed = new URL(url);
    return {
      username: parsed.username,
      password: parsed.password,
      host: parsed.hostname,
      port: parsed.port,
      database: parsed.pathname.slice(1),
    };
  } catch (e) {
    console.warn('Failed to parse DATABASE_URL', e);
    return {};
  }
};

const dbConfigFromEnv = parseDbUrl(process.env.DATABASE_URL);

module.exports = {
  production: {
    username: dbConfigFromEnv.username || process.env.PGUSER || process.env.DB_USER || 'postgres',
    password: dbConfigFromEnv.password || process.env.PGPASSWORD || process.env.DB_PASSWORD || null,
    database: dbConfigFromEnv.database || process.env.PGDATABASE || process.env.DB_NAME || 'todo_app',
    host: dbConfigFromEnv.host || process.env.PGHOST || process.env.DB_HOST || 'localhost',
    port: parseInt(dbConfigFromEnv.port || process.env.DB_PORT || '5432', 10),
    dialect: 'postgres',
    dialectOptions: {
      ssl: process.env.DB_SSL ? {
        require: true,
        rejectUnauthorized: false // Necessário para alguns provedores de nuvem
      } : false
    },
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
    },
    logging: process.env.NODE_ENV === 'production' ? false : console.log
  },
  // development: {
  //   username: process.env.DB_USER || 'postgres',
  //   password: process.env.DB_PASSWORD || null,
  //   database: process.env.DB_NAME || 'todo_app_dev',
  //   host: process.env.DB_HOST || 'localhost',
  //   port: parseInt(process.env.DB_PORT || '5432', 10),
  //   dialect: 'postgres',
  //   logging: console.log
  // },
  development: {
    username: 'postgres',
    password: "root",
    database: 'tododatabase',
    host: '127.0.0.1',
    port: 5432,
    dialect: 'postgres',
    logging: console.log
  },
  test: {
    username: process.env.DB_USER || 'postgres',
    password: process.env.DB_PASSWORD || null,
    database: process.env.DB_NAME || 'todo_app_test',
    host: process.env.DB_HOST || 'localhost',
    port: parseInt(process.env.DB_PORT || '5432', 10),
    dialect: 'postgres',
    logging: false
  }
};

// Verificação imediata (opcional)
if (require.main === module) {
  const env = process.env.NODE_ENV || 'development';
  console.log(`Database config for ${env}:`, JSON.stringify(module.exports[env], null, 2));
}