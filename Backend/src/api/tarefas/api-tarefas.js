const express = require('express');
const routes = express.Router();
const ControllerCriarTarefa = require('../../controllers/Tarefas');

routes.post('/create-task', ControllerCriarTarefa.criarTarefa);
module.exports = routes;