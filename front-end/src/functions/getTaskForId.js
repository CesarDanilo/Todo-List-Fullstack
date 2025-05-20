import axios from 'axios';

export const getTaskForId = async (id) => {
    try {
      const apiUrl = import.meta.env.VITE_API_URL
    
      const response = await axios.get(`${apiUrl}/tarefas/?id=` + id);
  
      if (response.data.data && Array.isArray(response.data.data)) {
        return response.data.data[0]; // ← Se for apenas 1 tarefa retornada
      } else {
        throw new Error("Formato de dados inválido");
      }
  
    } catch (error) {
      console.error("Erro ao buscar tarefas:", error);
    }
  }
  