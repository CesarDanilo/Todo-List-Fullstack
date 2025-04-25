const express = require('express');
const routes = express.Router();
const userController = require('../../controllers/Usuarios');

routes.post('/create-user', userController.criarUsuario);
routes.get('/', userController.buscarUsuario)

module.exports = routes;