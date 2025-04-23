'use strict';
const { Model, DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    class Usuarios extends Model {
        static associate(models) {
            // Users.hasMany(models.Pedido, { foreignKey: 'usuario_id' });
        }
    }
    Usuarios.init({
        id: {
            type: DataTypes.STRING(255),
            allowNull: false,
            autoIncrement: true,
            primaryKey: true
        },
        name: {
            type: DataTypes.STRING(255),
            allowNull: false
        },
        email: {
            type: DataTypes.STRING(255),
            allowNull: false
        },
        password: {
            type: DataTypes.STRING(255),
            allowNull: false
        },
        createdAt: {
            type: DataTypes.DATE
        },
        updatedAt: {
            type: DataTypes.DATE
        }
    }, {
        sequelize,
        modelName: 'Usuarios',
        tableName: 'usuarios',
        timestamps: true // Habilita o gerenciamento automático de createdAt e updatedAt
    });

    return Usuarios;
};