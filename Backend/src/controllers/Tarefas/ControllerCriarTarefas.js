const { Tarefas } = require('../../database/models');
const { v4: uuidv4 } = require('uuid');

const ControllerCriarTarefa = async (req, res) => {
    try {
        const { user_id, title, task_description, task_status, data } = req.body;

        if (!user_id || !title || !task_description || task_status === undefined || !data) {
            return res.status(400).json({
                msg: `Todos os campos são obrigatórios! ${user_id, title, task_description, task_status, data}`,
                data: req.body
            });
        }

        const newTask = {
            id: uuidv4(),
            user_id,
            title,
            task_description,
            task_status,
            data
        };

        const result = await Tarefas.create(newTask);

        return res.status(201).json({
            msg: "Gravado com sucesso!",
            data: result.dataValues
        });

    } catch (error) {
        console.error("Erro ao criar usuário:", error);
        return res.status(500).json({ msg: "Erro interno no servidor." });
    }
};

module.exports = ControllerCriarTarefa;
