import axios from 'axios';
import { useState, useEffect, useContext } from 'react';
import Header from '../../../components/Header';
import ActionsButtons from '../../../components/ActionsButtons';
import { deleteTasks } from '../../../functions/deleteTask';
import DialogForm from '../../../components/DialogForm';
import DialogDelete from '../../../components/DialogDelete';
import { getTaskForId } from '../../../functions/getTaskForId';
import { contextNumberTasks } from '../../../context/total_number_of_tasks';
import Cards from '../../../components/Cards';

export default function AllTasks() {
  const [tarefas, setTarefas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const [dados, setDados] = useState([]);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [tarefaParaDeletar, setTarefaParaDeletar] = useState(null);
  const [userId, setUserId] = useState();

  const { setTarefasLength } = useContext(contextNumberTasks);

  const loadUserIdFromLocalStorage = () => {
    try {
      const userString = localStorage.getItem('user');
      if (!userString) return;

      const user = JSON.parse(userString);
      if (user?.userId) setUserId(user.userId);
    } catch (error) {
      console.log(`ERROR! Não foi possível buscar o id de usuário: ${error}`);
    }
  };

  const fetchTarefas = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`http://localhost:3001/tarefas/?user_id=${userId}`);
      console.log("AQUI ESTA O ID DO USUARIO: ", `http://localhost:3001/tarefas/?user_id=${userId}`)
      if (response.data.data && Array.isArray(response.data.data)) {
        setTarefas(response.data.data);
        setTarefasLength(response.data.data.length);
      } else {
        throw new Error("Formato de dados inválido");
      }
    } catch (error) {
      console.error("Erro ao buscar tarefas:", error);
      setError(error.message || "Erro ao carregar tarefas");
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteTask = async (id) => {
    try {
      await deleteTasks(id);
      fetchTarefas();
    } catch (error) {
      console.error("Erro ao deletar tarefa:", error);
    }
  };

  const handleUpdateTask = async (id) => {
    try {
      const tarefa = await getTaskForId(id);
      setDados(tarefa);
      setIsOpen(true);
    } catch (error) {
      console.log("Erro no handleUpdateTask:", error);
    }
  };

  const handleClickDelete = (tarefa) => {
    setTarefaParaDeletar(tarefa);
    setShowDeleteDialog(true);
  };

  const handleConfirmDelete = async () => {
    if (!tarefaParaDeletar) return;
    await handleDeleteTask(tarefaParaDeletar.id);
    setShowDeleteDialog(false);
    setTarefaParaDeletar(null);
  };

  const handleCancelDelete = () => {
    setShowDeleteDialog(false);
    setTarefaParaDeletar(null);
  };

  // Carrega o ID do usuário ao montar o componente
  useEffect(() => {
    loadUserIdFromLocalStorage();
  }, []);

  // Só busca as tarefas quando userId estiver definido
  useEffect(() => {
    if (userId) {
      fetchTarefas();
    }
  }, [userId]);

  if (loading) return <div className="p-4 text-gray-200">Carregando tarefas...</div>;
  if (error) return <div className="p-4 text-red-400">Erro: {error}</div>;

  return (
    <div className="p-4 bg-[#0f0f0f] text-gray-200 min-h-screen">
      <Cards />

      <Header title={'ALL TASKS'} fetchTarefas={fetchTarefas} />

      {isOpen && (
        <DialogForm setIsOpen={setIsOpen} fetchTarefas={fetchTarefas} dados={dados} />
      )}

      {showDeleteDialog && (
        <DialogDelete onConfirm={handleConfirmDelete} onCancel={handleCancelDelete} />
      )}

      <table className="w-full text-sm">
        <thead>
          <tr className="text-gray-400 uppercase text-xs tracking-wider">
            <th className="text-left px-4 py-2">Title</th>
            <th className="text-left px-4 py-2">Descrição</th>
            <th className="text-left px-4 py-2">Status</th>
            <th className="text-left px-4 py-2">Data & Hora</th>
            <th className="text-left px-4 py-2">Ações</th>
          </tr>
        </thead>

        <tbody>
          {tarefas.map((tarefa) => (
            <tr key={tarefa.id} className="hover:bg-[#1a1a1a] rounded transition-colors">
              <td className="px-4 py-2 text-gray-100">{tarefa.title || 'Sem título'}</td>
              <td className="px-4 py-2 text-gray-400">{tarefa.task_description || 'Sem descrição'}</td>
              <td className={`px-4 py-2 ${tarefa.task_status ? "text-green-400" : "text-red-500"}`}>
                {tarefa.task_status ? 'active' : 'disabled'}
              </td>
              <td className="px-4 py-2 text-gray-400">
                {tarefa.data
                  ? new Date(new Date(tarefa.data).getTime() + 3 * 60 * 60 * 1000).toLocaleString()
                  : 'Sem data'}
              </td>
              <td className="px-4 py-2 flex gap-1">
                <ActionsButtons type="Edit" onClick={() => handleUpdateTask(tarefa.id)} />
                <ActionsButtons type="Delete" onClick={() => handleClickDelete(tarefa)} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
