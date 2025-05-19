import axios from "axios";

export const deleteTasks = async (id) => {
    const apiUrl = import.meta.env.VITE_API_URL_TASKS
    
    const url = `${apiUrl}tarefas/`;
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