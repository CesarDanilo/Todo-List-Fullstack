require('dotenv').config({ path: path.resolve(__dirname, '../../../.env') });

const path = require('path');

// Validação robusta das variáveis de ambiente
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
    use_env_variable: 'DATABASE_URL', // Prioriza a URL completa
    username: process.env.PGUSER,
    password: process.env.PGPASSWORD,
    database: process.env.PGDATABASE,
    host: process.env.PGHOST,
    port: Number(process.env.PGPORT) || 5432,
    dialect: 'postgres',
    protocol: 'postgres',
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false
      }
    },
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
    },
    logging: console.log, // Ativar logs para debug
    define: {
      timestamps: true,
      underscored: true,
      freezeTableName: true
    }
  },
  development: {
    username: process.env.DB_USER || 'postgres',
    password: process.env.DB_PASSWORD || 'postgres',
    database: process.env.DB_NAME || 'myapp_dev',
    host: process.env.DB_HOST || 'localhost',
    port: Number(process.env.DB_PORT) || 5432,
    dialect: 'postgres',
    logging: console.log,
    dialectOptions: {
      ssl: process.env.DB_SSL === 'true'
    }
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