const { Tarefas } = require('../../database/models');
const { v4: uuidv4 } = require('uuid');

const ControllerCriarTarefa = async (req, res) => {
    try {
        const { user_id, title, task_description, task_status, data } = req.body;

        // Validação dos campos obrigatórios
        if (!user_id || !title || !task_description || task_status === undefined || !data) {
            return res.status(400).json({
                msg: 'Todos os campos são obrigatórios!',
                data: req.body
            });
        }

        // Convertendo a data para o formato adequado (ajustando o fuso horário)
        const [datePart, timePart] = data.split('T');
        const [year, month, day] = datePart.split('-');
        const [hour, minute] = timePart.split(':');
        const localDate = new Date(year, month - 1, day, hour, minute); // Convertendo para o horário local

        // Criando o objeto da tarefa
        const newTask = {
            id: uuidv4(),
            user_id,
            title,
            task_description,
            task_status,
            data: localDate // Salvando a data ajustada
        };

        // Criando a tarefa no banco de dados
        const result = await Tarefas.create(newTask);

        return res.status(201).json({
            msg: "Tarefa criada com sucesso!",
            data: result.dataValues
        });

    } catch (error) {
        console.error("Erro ao criar tarefa:", error);
        return res.status(500).json({ msg: "Erro interno no servidor." });
    }
};

module.exports = ControllerCriarTarefa;
