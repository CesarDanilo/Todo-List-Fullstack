const express = require('express');
const routes = express.Router();
const userController = require('../../controllers/Usuarios');

const createUserBcrypt = require('../../middleware/createUserBcrypt');
const validationUserLogin = require('../../middleware/validationUserLogin')

routes.post('/auth/register', createUserBcrypt, userController.criarUsuario);
routes.post('/auth/login', validationUserLogin);
routes.get('/', userController.buscarUsuario)

module.exports = routes;