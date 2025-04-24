const express = require('express');
const routes = express.Router();
const userController = require('../../controllers/Usuarios');

routes.post('/', userController.criarUsuario);

module.exports = routes;