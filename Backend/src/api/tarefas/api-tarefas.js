const express = require('express');
const routes = express.Router();
const ControllerCriarTarefa = require('../../controllers/Tarefas');
const ControllerBuscarTarefas = require('../../controllers/Tarefas');

routes.post('/create-task', ControllerCriarTarefa.criarTarefa);
routes.get('/', ControllerBuscarTarefas.buscarTarefa);
module.exports = routes;