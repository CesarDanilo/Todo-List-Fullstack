import axios from "axios";

export const deleteTasks = async (id) => {
    const url = 'http://localhost:3001/tarefas/';
    try {
        if (!id) { return console.log(`Erro no seu id: ${id}`) }
        const response = await axios.delete(url + id);
        if (response.status === 201) {
            return true;
        } else {
            return false;
        }

    } catch (error) {
        return error;
    }
}