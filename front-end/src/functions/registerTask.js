// registerTask.js

import axios from "axios";

export const registerTasks = async (taskData, id = null) => {
    const url = 'http://localhost:3001';
    const path = id ? `/tarefas/${id}` : '/tarefas/create-task';
    try {
        if (!id) {
            const response = await axios.post(url + path, taskData);
            if (response.status === 201) {
                return true;
            } else {
                return false;
            }
        }
    } catch (error) {
        return error;
    }
};
