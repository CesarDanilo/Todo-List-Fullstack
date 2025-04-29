'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class tarefas extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  tarefas.init({
    id: DataTypes.STRING,
    user_id: DataTypes.STRING,
    title: DataTypes.STRING,
    task_description: DataTypes.STRING,
    task_status: DataTypes.BOOLEAN,
    data: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'tarefas',
  });
  return tarefas;
};