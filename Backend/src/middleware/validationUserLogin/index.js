const { Usuarios } = require("../../database/models");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const validationUserLogin = async (req, res) => {
    const { email, password } = req.body;

    // Verifica se email e senha foram enviados
    if (!email || !password) {
        return res.status(400).json({ msg: "Email e senha são obrigatórios!" });
    }

    try {
        // Verifica se o usuário existe
        const user = await Usuarios.findOne({ where: { email: email } });
        if (!user) {
            return res.status(404).json({ msg: "Usuário não encontrado!" });
        }

        // Verifica se a senha está correta
        const checkPassword = await bcrypt.compare(password, user.password);
        if (!checkPassword) {
            console.log("Senha incorreta");
            return res.status(422).json({ msg: "Senha incorreta!" });
        }

        // Gera o token JWT
        const secret = process.env.SECRET;
        if (!secret) {
            return res.status(500).json({ msg: "Secret key not defined!" });
        }

        const token = jwt.sign({ id: user.id }, secret, { expiresIn: '1h' });

        // Prepara os dados para retorno
        const dados = { email: user.email, name: user.username, userId: user.id };

        // Retorna a resposta de sucesso com o token
        return res.status(200).json({ msg: "Autenticação realizada com sucesso!", token, dados });
    } catch (erro) {
        // Em caso de erro, retorna uma resposta genérica
        console.error(erro);
        return res.status(500).json({ msg: "Erro interno no servidor!" });
    }
};

module.exports = { validationUserLogin };
