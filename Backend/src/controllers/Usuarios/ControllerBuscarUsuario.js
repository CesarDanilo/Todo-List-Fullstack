const { Usuarios } = require('../../database/models');
const { Op } = require('sequelize');

const ControllerBuscarUsuarios = async (req, res) => {
    const { id, email } = req.query;

    try {
        let where = {};

        if (id) where.id = id;
        if (email) where.email = { [Op.iLike]: `%${email}%` };

        const result = await Usuarios.findAll({
            where,
            attributes: ['id', 'username', 'email', 'createdAt', 'updatedAt']
        });

        return res.status(200).json({ data: result });

    } catch (error) {
        console.error('Erro ao buscar usuários:', error);
        return res.status(400).json({
            msg: 'Erro ao tentar listar usuários',
            erro: error.message
        });
    }
};

module.exports = ControllerBuscarUsuarios;