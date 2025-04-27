const { Usuarios } = require("../../database/models")
// const bcrypt = require("bcrypt");

const createUserBcrypt = async (req, res, next) => {
    // const salt = 10
    // const result = "";
    try {
        const { username, email, password } = req.body;

        if (!email) {
            return res.status(422).json({ msg: "O e-mail é obrigatório!" });
        }
        const checkUserExists = await Usuarios.findOne({ where: { "email": email } });

        if (checkUserExists) {
            return res.status(422).json({ msg: "Já existe um usuário com esse e-mail, por favor utilize outro!" });
        }

    } catch (error) {
        res.status(500).json({ msg: "Erro na criação de usuario", error: error });
    }
}

module.exports = createUserBcrypt;