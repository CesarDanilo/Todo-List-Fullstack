'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.renameColumn('usuarios', 'createdat', 'created_at');
    await queryInterface.renameColumn('usuarios', 'updatedat', 'updated_at');
    
    // Opcional: criar o trigger de atualização automática
    await queryInterface.sequelize.query(`
      CREATE OR REPLACE FUNCTION update_updated_at_column()
      RETURNS TRIGGER AS $$
      BEGIN
        NEW.updated_at = NOW();
        RETURN NEW;
      END;
      $$ LANGUAGE plpgsql;

      CREATE TRIGGER update_usuarios_updated_at
      BEFORE UPDATE ON usuarios
      FOR EACH ROW
      EXECUTE FUNCTION update_updated_at_column();
    `);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.renameColumn('usuarios', 'created_at', 'createdat');
    await queryInterface.renameColumn('usuarios', 'updated_at', 'updatedat');
    
    // Remover o trigger se criado
    await queryInterface.sequelize.query(`
      DROP TRIGGER IF EXISTS update_usuarios_updated_at ON usuarios;
      DROP FUNCTION IF EXISTS update_updated_at_column;
    `);
  }
};