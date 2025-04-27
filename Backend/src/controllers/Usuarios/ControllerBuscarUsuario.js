const { Usuarios } = require('../../database/models');

const ControllerBuscarUsuarios = async (req, res, next) => {

    const { id } = req.query;

    try {
        let whare = {};

        if (id) {
            whare.id = id;
        }

        const result = await Usuarios.findAll({
            whare,
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