const { Usuarios } = require('../../database/models');
const { v4: uuidv4 } = require('uuid');

const ControllerCriarUsuario = async (req, res) => {
    try {
        const data = req.body;

        // Validando informações recebidas
        if (!data.name || !data.email || !data.password || !data.status) {
            return res.status(400).json({
                msg: "Não foi possivel gravar! Todos os campos são obrigatorios!",
                data: req.body
            })
        }

        const userId = uuidv4();
        data.id = userId;

        let result;
        try {
            result = await Usuarios.create(data);
        } catch (error) {
            return res.status(400).json({
                msg: "Não foi possível gravar!",
                erro: error.message
            })
        }

        return res.status(200).json({
            msg: "GRAVADO COM SÚCESSO",
            data: result.dataValues
        });
    } catch (error) {
        return res.status(400).send(`Não foi possível fazer a operação: ${error}`);
    }
}

module.exports = ControllerCriarUsuario;