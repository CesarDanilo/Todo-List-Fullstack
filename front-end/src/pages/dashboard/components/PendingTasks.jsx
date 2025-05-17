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

export default function PendingTasks() {
  const [tarefas, setTarefas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const [dados, setDados] = useState([]);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [tarefaParaDeletar, setTarefaParaDeletar] = useState(null);
  const [userId, setUserId] = useState(null);

  const { setPendingTarefasLength } = useContext(contextNumberTasks);

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
    if (!userId) return;

    try {
      setLoading(true);
      const response = await axios.get(`http://localhost:3001/tarefas/?user_id=${userId}&task_status=true`);
      if (response.data.data && Array.isArray(response.data.data)) {
        setTarefas(response.data.data);
        setPendingTarefasLength(response.data.data.length);
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
    if (userId) fetchTarefas();
  }, [userId]);

  if (loading) return <div className="p-4 text-gray-200">Carregando tarefas...</div>;
  if (error) return <div className="p-4 text-red-400">Erro: {error}</div>;

  return (
    <div className="min-h-screen bg-[#101010] text-gray-200">
      <div className="max-w-5xl mx-auto flex flex-wrap gap-4 justify-start p-6">
        <Cards title="Pending" />
      </div>
      <div className="max-w-5xl mx-auto px-4">
        {/* <Header title={'COMPLETED TASKS'} fetchTarefas={fetchTarefas} /> */}

        {isOpen && <DialogForm setIsOpen={setIsOpen} fetchTarefas={fetchTarefas} dados={dados} />}
        {showDeleteDialog && <DialogDelete onConfirm={handleConfirmDelete} onCancel={handleCancelDelete} />}

        <table className="w-full table-auto border-separate border-spacing-y-2">
          <thead>
            <tr className="text-xs text-gray-400 uppercase">
              {['Title', 'Descrição', 'Status', 'Data & Hora'].map((h) => (
                <th key={h} className="text-left py-2">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {tarefas.map((t) => (
              <tr
                key={t.id}
                className="bg-[#181818] hover:bg-[#212121] transition rounded"
              >
                <td className="px-3 py-2">{t.title || '—'}</td>
                <td className="px-3 py-2 text-gray-400">
                  {t.task_description || '—'}
                </td>
                <td className="px-3 py-2">
                  <span
                    className={`text-sm font-medium ${t.task_status ? 'text-green-400' : 'text-red-500'
                      }`}
                  >
                    {t.task_status ? 'Active' : 'Disabled'}
                  </span>
                </td>
                <td className="px-3 py-2 text-gray-400">
                  {t.data
                    ? new Date(t.data).toLocaleString()
                    : '—'}
                </td>
                <td className="px-3 py-2 flex space-x-2 justify-end">
                  <ActionsButtons
                    type="Edit"
                    onClick={() => handleEdit(t.id)}
                  />
                  <ActionsButtons
                    type="Delete"
                    onClick={() => {
                      setTarefaParaDeletar(t);
                      setShowDeleteDialog(true);
                    }}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>

      </div>
    </div>
  );
}
