const { Usuarios } = require('../../database/models');
const { Op } = require('sequelize');

const ControllerBuscarUsuarios = async (req, res, next) => {

    const { id, email } = req.query;

    try {
        let where = {};

        if (id) {
            where.id = id;
        }

        if (email) {
            where.email = {
                [Op.iLike]: `%${email}%`
            };
        }

        const result = await Usuarios.findAll({
            where,
            attributes: ['id', 'username', 'email', 'createdAt', 'updatedAt']
        })

        return res.status(200).json({
            data: result
        });

    } catch (error) {
        const msg = 'Erro ao tentar listar Users';
        console.error(error);
        return res.status(400).json({ msg, erro: error.message });
    }
}

module.exports = ControllerBuscarUsuarios;