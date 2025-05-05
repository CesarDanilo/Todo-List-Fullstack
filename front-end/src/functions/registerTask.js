import axios from "axios";

const registerTasks = async (dataTasks, id = null) => {
    const url = 'http://localhost:3001';
    const path = id ? `/tarefas/${id}` : '/tarefas/create-task';
    try {
        if (!id) {
            const response = await axios.post(url + path, dataTasks);
            if (response.status === 200) {
                window.alert("Gravado com súcesso!");
            } else {
                window.alert("Aconteceu algum erro!");
            }
        }
    } catch (error) { return error; }
}