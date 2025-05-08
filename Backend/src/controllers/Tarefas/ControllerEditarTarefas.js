const { Tarefas } = require('../../database/models');

const ControllerEditarTarefa = async (req, res) => {
    try {
        const { id } = req.params;
        const { title, task_description, task_status, data } = req.body;

        if (!title || !task_description || task_status === undefined || !data) {
            return res.status(400).json({
                msg: "Todos os campos são obrigatórios!",
                data: req.body
            });
        }

        const tarefa = await Tarefas.findByPk(id);

        if (!tarefa) {
            return res.status(404).json({ msg: "Tarefa não encontrada." });
        }

        await tarefa.update({
            title,
            task_description,
            task_status,
            data
        });

        return res.status(200).json({
            msg: "Tarefa atualizada com sucesso!",
            data: tarefa
        });

    } catch (error) {
        console.error("Erro ao editar tarefa:", error);
        return res.status(500).json({ msg: "Erro interno no servidor." });
    }
};

module.exports = ControllerEditarTarefa;
