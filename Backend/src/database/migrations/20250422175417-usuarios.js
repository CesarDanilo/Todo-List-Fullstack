'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable(
      'users', {

      id: {
        type: Sequelize.STRING(255),
        allowNull: false,
        primaryKey: true
      },
      name: {
        type: Sequelize.STRING(255),
        allowNull: false
      },
      email: {
        type: Sequelize.STRING(255),
        allowNull: false
      },
      password: {
        type: Sequelize.STRING(255),
        allowNull: false
      },
      cpf: {
        type: Sequelize.STRING(255),
        allowNull: false
      },
      role: {
        type: Sequelize.STRING(50),
        allowNull: false,
        validate: {
          isIn: [['paciente', 'médico', 'admin']]
        }
      },
      createdAt: {
        type: Sequelize.DATE
      },
      updatedAt: {
        type: Sequelize.DATE
      },
    }
    }
    );
},

  async down(queryInterface, Sequelize) {
  /**
   * Add reverting commands here.
   *
   * Example:
   * await queryInterface.dropTable('users');
   */
}
};
