'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('tarefas', {
      id: {
        allowNull: false,
        type: Sequelize.STRING(255),
        primaryKey: true,
      },
      user_id: {
        type: Sequelize.STRING(255)
      },
      title: {
        type: Sequelize.STRING(255)
      },
      task_description: {
        type: Sequelize.STRING(255)
      },
      task_status: {
        type: Sequelize.BOOLEAN
      },
      data: {
        type: Sequelize.DATE
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('tarefas');
  }
};