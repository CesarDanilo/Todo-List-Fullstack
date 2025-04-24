const { Usuarios } = require('../../database/models');
const { v4: uuidv4 } = require('uuid');

const ControllerCriarUsuario = async (req, res) => {
    try {
        const data = req.body;
        if (!data.name || !data.email || !data.password || !data.status) {
            return res.status(400).json({
                msg: "Não foi possivel gravar! Todos os campos são obrigatorios!",
                data: req.body
            })
        }
    } catch (error) {

    }
}

module.exports = ControllerCriarUsuario;