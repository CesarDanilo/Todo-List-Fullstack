'use strict';
const { Model, DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    class Usuarios extends Model {
        static associate(models) {
            // associações podem ser definidas aqui
        }
    }

    Usuarios.init({
        id: {
            type: DataTypes.STRING(255),
            allowNull: false,
            primaryKey: true
        },
        username: {
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
        created_at: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: DataTypes.NOW
        },
        updated_at: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: DataTypes.NOW
        }
    }, {
        sequelize,
        modelName: 'Usuarios',
        tableName: 'usuarios',
        timestamps: true,          // Habilita timestamps
        createdAt: 'created_at',   // Mapeia createdAt para created_at
        updatedAt: 'updated_at',   // Mapeia updatedAt para updated_at
        underscored: true          // Converte automaticamente para snake_case
    });

    return Usuarios;
};