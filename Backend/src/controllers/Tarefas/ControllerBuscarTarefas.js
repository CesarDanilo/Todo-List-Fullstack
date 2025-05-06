const { Tarefas } = require('../../database/models');
const { Op } = require('sequelize');

const ControllerBuscarTarefas = async (req, res) => {
    const { id, user_id, task_status } = req.query;

    try {
        let where = {};

        if (id) {
            where.id = id;
        }

        if (user_id) {
            where.user_id = user_id;
        }

        if (task_status) {
            where.task_status = task_status;
        }

        const result = await Tarefas.findAll({
            where,
            order: [['createdAt', 'DESC']], // ordenação corrigida
            attributes: ['id', 'user_id', 'title', 'task_description', 'task_status', 'data', 'createdAt', 'updatedAt']
        });

        return res.status(200).json({
            data: result
        });

    } catch (error) {
        const msg = 'Erro ao tentar listar Tarefas';
        console.error(error);
        return res.status(400).json({ msg, erro: error.message });
    }
};

module.exports = ControllerBuscarTarefas;
