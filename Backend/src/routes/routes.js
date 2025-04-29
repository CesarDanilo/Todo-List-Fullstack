const express = require("express");
const routes = express.Router();
const user_api = require("../api/usuarios/api-usuarios");
const task_api = require("../api/tarefas/api-tarefas");

routes.use('/usuarios', user_api);
routes.use('/tarefas', task_api);

module.exports = routes;