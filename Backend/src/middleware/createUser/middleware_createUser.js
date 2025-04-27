const { Usuarios } = require("../../database/models")
const bcrypt = require("bcrypt");

const createUserBcrypt = async (req, res, next) => {
    const salt = 10
    const result = "";
    try {
        const { username, email, password } = req.body;
        const checkUserExists = Usuarios.findOne({ where: { "email": email } });

    } catch (error) {

    }
}

module.exports = createUserBcrypt;