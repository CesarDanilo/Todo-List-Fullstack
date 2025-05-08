const criarTarefa = require("./ControllerCriarTarefas");
const buscarTarefa = require("./ControllerBuscarTarefas");
const deletarTarefa = require("./ControllerDeletarTarefas");
const editarTarefa = require("./ControllerEditarTarefas")

module.exports = {
    criarTarefa,
    buscarTarefa,
    deletarTarefa,
    editarTarefa
}