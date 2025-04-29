'use strict';
const { Model, DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  class Tarefas extends Model {
    static associate(models) {
      // Users.hasMany(models.Pedido, { foreignKey: 'usuario_id' });
    }
  }
  Tarefas.init({
    id: {
      type: DataTypes.STRING(255),
      allowNull: false,
      autoIncrement: true,
      primaryKey: true
    },
    user_id: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    title: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    task_description: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    task_status: {
      type: DataTypes.BOOLEAN,
      allowNull: false
    },
    data: {
      type: DataTypes.DATE
    },
    createdAt: {
      type: DataTypes.DATE
    },
    updatedAt: {
      type: DataTypes.DATE
    }
  }, {
    sequelize,
    modelName: 'Tarefas',
    tableName: 'tarefas',
    timestamps: true // Habilita o gerenciamento automático de createdAt e updatedAt
  });

  return Tarefas;
};