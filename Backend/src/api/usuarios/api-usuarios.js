const express = require('express');
const routes = express.Router();
const userController = require('../../controllers/Usuarios');

const createUserBcrypt = require('../../middleware/createUserBcrypt');

routes.post('/create-user', createUserBcrypt , userController.criarUsuario);
routes.get('/', userController.buscarUsuario)

module.exports = routes;