const { Usuarios } = require("../../database/models")
const bcrypt = require("bcryptjs");

const createUserBcrypt = async (req, res, next) => {

    try {
        const { username, email, password } = req.body;

        if (!username) {
            return res.status(422).json({ msg: "O Usuario é obrigatório!" });
        }
        if (!email) {
            return res.status(422).json({ msg: "O E-mail é obrigatório!" });
        }
        if (!password) {
            return res.status(422).json({ msg: "O Password é obrigatório!" });
        }

        const checkUserExists = await Usuarios.findOne({ where: { "email": email } });

        if (checkUserExists) {
            return res.status(422).json({ msg: "Já existe um usuário com esse e-mail, por favor utilize outro!" });
        }

        const salt = await bcrypt.genSalt(12);
        const passwordHash = await bcrypt.hash(password, salt);

        req.body.password = passwordHash;

        next();

    } catch (error) {
        res.status(500).json({ msg: "Erro na criação de usuario", error: error });
    }
}

module.exports = createUserBcrypt;