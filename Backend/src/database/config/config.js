const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '../../../.env') });

// Validação das variáveis de ambiente
const validateEnv = () => {
  const requiredVars = ['PGUSER', 'PGPASSWORD', 'PGHOST', 'PGDATABASE'];
  const missingVars = requiredVars.filter(varName => !process.env[varName]);

  if (missingVars.length > 0) {
    console.error('Variáveis de ambiente ausentes:', missingVars);
    throw new Error(`Configuração incompleta: ${missingVars.join(', ')}`);
  }
};

if (process.env.NODE_ENV === 'production') {
  validateEnv();
}

module.exports = {
  production: {
    use_env_variable: 'DATABASE_URL',
    dialect: 'postgres',
    protocol: 'postgres',
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false
      }
    },
    logging: console.log
  },
  development: {
    username: process.env.DB_USER || 'postgres',
    password: process.env.DB_PASSWORD || 'postgres',
    database: process.env.DB_NAME || 'myapp_dev',
    host: process.env.DB_HOST || 'localhost',
    port: Number(process.env.DB_PORT) || 5432,
    dialect: 'postgres',
    logging: console.log
  },
  test: {
    username: process.env.DB_USER || 'postgres',
    password: process.env.DB_PASSWORD || 'postgres',
    database: process.env.DB_NAME || 'myapp_test',
    host: process.env.DB_HOST || 'localhost',
    port: Number(process.env.DB_PORT) || 5432,
    dialect: 'postgres',
    logging: false
  }
};