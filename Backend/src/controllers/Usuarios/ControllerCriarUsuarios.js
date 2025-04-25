const { Usuarios } = require('../../database/models');
const { v4: uuidv4 } = require('uuid');

const ControllerCriarUsuario = async (req, res) => {
    try {
        const { username, email, password } = req.body;

        if (!username || !email || !password) {
            return res.status(400).json({
                msg: "Todos os campos são obrigatórios!",
                data: req.body
            });
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return res.status(400).json({ msg: "Email inválido!" });
        }

        const newUser = {
            id: uuidv4(),
            username,
            email,
            password
        };

        const result = await Usuarios.create(newUser);

        return res.status(201).json({
            msg: "Gravado com sucesso!",
            data: result.dataValues
        });

    } catch (error) {
        console.error("Erro ao criar usuário:", error);
        return res.status(500).json({ msg: "Erro interno no servidor." });
    }
};

module.exports = ControllerCriarUsuario;
