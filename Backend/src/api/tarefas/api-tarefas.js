const express = require('express');
const routes = express.Router();
const ControllerCriarTarefa = require('../../controllers/Tarefas');
const ControllerBuscarTarefas = require('../../controllers/Tarefas');
const ControllerDeletarTarefas = require('../../controllers/Tarefas');
const ControllerEditarTarefas = require('../../controllers/Tarefas')

routes.post('/create-task', ControllerCriarTarefa.criarTarefa);
routes.get('/', ControllerBuscarTarefas.buscarTarefa);
routes.delete('/:id', ControllerDeletarTarefas.deletarTarefa);
routes.put('/:id', ControllerEditarTarefas.editarTarefa);
module.exports = routes;