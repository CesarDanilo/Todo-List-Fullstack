import axios from 'axios';
import { useState, useEffect, useContext } from 'react';
import Header from '../../../components/Header';
import ActionsButtons from '../../../components/ActionsButtons';
import { deleteTasks } from '../../../functions/deleteTask';
import DialogForm from '../../../components/DialogForm';
import DialogDelete from '../../../components/DialogDelete';
import { getTaskForId } from '../../../functions/getTaskForId';
import { contextNumberTasks } from '../../../context/total_number_of_tasks';

export default function CompletedTasks() {
  const [tarefas, setTarefas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const [dados, setDados] = useState([]);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [tarefaParaDeletar, setTarefaParaDeletar] = useState(null);
  const [userId, setUserId] = useState(null);

  const { setCompletedTarefasLength } = useContext(contextNumberTasks);

  const loadUserIdFromLocalStorage = () => {
    try {
      const userString = localStorage.getItem('user');
      if (!userString) return;

      const user = JSON.parse(userString);
      if (user?.userId) setUserId(user.userId);
    } catch (error) {
      console.error("Erro ao carregar ID do usuário:", error);
    }
  };

  const fetchTarefas = async () => {
    if (!userId) return;

    setLoading(true);

    try {
      const response = await axios.get(`http://localhost:3001/tarefas/?user_id=${userId}&task_status=false`);

      if (response.data.data && Array.isArray(response.data.data)) {
        setTarefas(response.data.data);
        setCompletedTarefasLength(response.data.data.length);
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

  useEffect(() => {
    loadUserIdFromLocalStorage();
  }, []);

  useEffect(() => {
    if (userId) {
      fetchTarefas();
    }
  }, [userId]);

  if (loading) return <div className="p-4">Carregando tarefas...</div>;
  if (error) return <div className="p-4 text-red-500">Erro: {error}</div>;

  return (
    <div className="p-4">
      <Header title={'COMPLETED'} fetchTarefas={fetchTarefas} />

      {isOpen && (
        <DialogForm setIsOpen={setIsOpen} fetchTarefas={fetchTarefas} dados={dados} />
      )}

      {showDeleteDialog && (
        <DialogDelete onConfirm={handleConfirmDelete} onCancel={handleCancelDelete} />
      )}

      <table className="min-w-full rounded-lg overflow-hidden shadow-sm">
        <thead>
          <tr className="bg-[#f1f1eb]">
            <th className="px-6 py-4 text-left text-sm font-medium text-gray-700 border-b border-gray-200">Title</th>
            <th className="px-6 py-4 text-left text-sm font-medium text-gray-700 border-b border-gray-200">Descrição</th>
            <th className="px-6 py-4 text-left text-sm font-medium text-gray-700 border-b border-gray-200">Status</th>
            <th className="px-6 py-4 text-left text-sm font-medium text-gray-700 border-b border-gray-200">Data & Hora</th>
            <th className="px-6 py-4 text-left text-sm font-medium text-gray-700 border-b border-gray-200">Actions</th>
          </tr>
        </thead>

        <tbody className="bg-white divide-y divide-gray-100">
          {tarefas.map((tarefa) => (
            <tr key={tarefa.id} className="hover:bg-[#f9f9f5] transition-colors duration-150">
              <td className="px-6 py-4 text-sm font-medium text-gray-900">{tarefa.title || 'Sem título'}</td>
              <td className="px-6 py-4 text-sm text-gray-600">{tarefa.task_description || 'Sem descrição'}</td>
              <td className={`px-6 py-4 text-sm ${tarefa.task_status ? "text-green-500" : "text-red-700"}`}>
                {tarefa.task_status ? 'active' : 'disabled'}
              </td>
              <td className="px-6 py-4 text-sm text-gray-600">
                {tarefa.data
                  ? new Date(new Date(tarefa.data).getTime() + 3 * 60 * 60 * 1000).toLocaleString()
                  : 'Sem data'}
              </td>
              <td className="flex px-6 py-4 text-sm gap-1 text-gray-600">
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
