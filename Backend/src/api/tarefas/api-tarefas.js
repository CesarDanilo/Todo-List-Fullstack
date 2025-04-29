const express = require('express');
const routes = express.Router();
const taskController = require('../../controllers/Tarefas');

routes.post('/create-task', taskController.criarUsuario);
routes.get('/', taskController.buscarUsuario)

module.exports = routes;