const { Usuarios } = require('../../database/models');
const { v4: uuidv4 } = require('uuid');
const bcrypt = require('bcrypt');

const ControllerCriarUsuario = async (req, res) => {
    try {
        const { username, email, password } = req.body;

        // Validação mais completa
        if (!username?.trim() || !email?.trim() || !password?.trim()) {
            return res.status(400).json({
                success: false,
                message: "Todos os campos são obrigatórios!",
                errors: {
                    username: !username?.trim() ? 'Nome de usuário obrigatório' : null,
                    email: !email?.trim() ? 'Email obrigatório' : null,
                    password: !password?.trim() ? 'Senha obrigatória' : null
                }
            });
        }

        // Verifica se usuário já existe
        const usuarioExistente = await Usuarios.findOne({
            where: { email }
        });

        if (usuarioExistente) {
            return res.status(409).json({
                success: false,
                message: "Email já cadastrado"
            });
        }

        // Validação de senha forte (opcional)
        if (password.length < 8) {
            return res.status(400).json({
                success: false,
                message: "Senha deve ter no mínimo 8 caracteres"
            });
        }

        // Criptografa a senha
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(password, saltRounds);

        const newUser = {
            id: uuidv4(),
            username: username.trim(),
            email: email.trim().toLowerCase(), // Normaliza email
            password: hashedPassword // Armazena a senha criptografada
        };

        const result = await Usuarios.create(newUser);

        // Remove a senha do retorno
        const userResponse = { ...result.dataValues };
        delete userResponse.password;

        return res.status(201).json({
            success: true,
            message: "Usuário criado com sucesso!",
            data: userResponse
        });

    } catch (error) {
        console.error("Erro ao criar usuário:", error);

        // Tratamento de erros mais específico
        if (error.name === 'SequelizeValidationError') {
            return res.status(400).json({
                success: false,
                message: "Erro de validação",
                errors: error.errors.map(err => ({
                    field: err.path,
                    message: err.message
                }))
            });
        }

        return res.status(500).json({
            success: false,
            message: "Erro interno no servidor",
            error: process.env.NODE_ENV === 'development' ? error.message : undefined
        });
    }
};

module.exports = ControllerCriarUsuario;