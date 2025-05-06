const { Tarefas } = require('../../database/models');

const ControllerDeletarTarefas = async (req, res) => {
    const { id } = req.params;

    if (!id) {
        return res.status(400).send("ID da tarefa não fornecido.");
    }

    try {
        const tarefa = await Tarefas.findByPk(id);

        if (!tarefa) {
            return res.status(404).send(`Tarefa não encontrada com id ${id}`);
        }

        await Tarefas.destroy({ where: { id } });

        return res.status(200).send(`Item deletado com sucesso! id: ${id}`);
    } catch (error) {
        console.error(error);
        return res.status(500).send(`Erro ao deletar a tarefa: ${error.message}`);
    }
};

module.exports = ControllerDeletarTarefas;
