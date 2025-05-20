require('dotenv').config();

// Função para validar variáveis de ambiente críticas
const validateEnv = () => {
  const requiredVars = ['PGUSER', 'PGPASSWORD', 'PGHOST', 'PGDATABASE'];
  const missingVars = requiredVars.filter(varName => !process.env[varName]);

  if (missingVars.length > 0) {
    throw new Error(`Variáveis de ambiente ausentes: ${missingVars.join(', ')}`);
  }
};

// Valida as variáveis apenas para produção
if (process.env.NODE_ENV === 'production') {
  validateEnv();
}

module.exports = {
  production: {
    username: String(process.env.PGUSER),
    password: String(process.env.PGPASSWORD),
    database: String(process.env.PGDATABASE),
    host: String(process.env.PGHOST),
    port: Number(process.env.PGPORT) || 5432,
    dialect: 'postgres',
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false
      }
    },
    protocol: 'postgres',
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
    },
    logging: process.env.NODE_ENV === 'development' ? console.log : false,
    define: {
      timestamps: true,
      underscored: true,
      freezeTableName: true
    }
  },
  development: {
    username: String(process.env.DB_USER || 'postgres'),
    password: String(process.env.DB_PASSWORD || 'postgres'),
    database: String(process.env.DB_NAME || 'myapp_dev'),
    host: String(process.env.DB_HOST || 'localhost'),
    port: Number(process.env.DB_PORT) || 5432,
    dialect: 'postgres',
    logging: console.log,
    dialectOptions: {
      ssl: process.env.DB_SSL === 'true' ? {
        require: true,
        rejectUnauthorized: false
      } : false
    },
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
    }
  },
  test: {
    username: String(process.env.DB_USER || 'postgres'),
    password: String(process.env.DB_PASSWORD || 'postgres'),
    database: String(process.env.DB_NAME || 'myapp_test'),
    host: String(process.env.DB_HOST || 'localhost'),
    port: Number(process.env.DB_PORT) || 5432,
    dialect: 'postgres',
    logging: false,
    dialectOptions: {
      ssl: false
    },
    pool: {
      max: 1,
      min: 0,
      acquire: 30000,
      idle: 10000
    }
  }
};