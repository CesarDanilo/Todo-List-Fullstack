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
  const [dados, setDados] = useState(null);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [tarefaParaDeletar, setTarefaParaDeletar] = useState(null);
  const [userId, setUserId] = useState();

  const { setTarefasLength } = useContext(contextNumberTasks);

  // Carrega o ID do usuário
  useEffect(() => {
    const stored = localStorage.getItem('user');
    if (stored) {
      const { userId } = JSON.parse(stored);
      setUserId(userId);
    }
  }, []);

  // Busca tarefas
  useEffect(() => {
    if (!userId) return;
    fetchTarefas();
  }, [userId, setTarefasLength]);

  const fetchTarefas = async () => {
    setLoading(true);
    try {
      const { data } = await axios.get(
        `http://localhost:3001/tarefas?user_id=${userId}`
      );
      const list = Array.isArray(data.data) ? data.data : [];
      setTarefas(list);
      setTarefasLength(list.length);
    } catch (err) {
      setError('Falha ao carregar tarefas');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    await deleteTasks(id);
    setTarefas((prev) => prev.filter((t) => t.id !== id));
  };

  const handleEdit = async (id) => {
    const task = await getTaskForId(id);
    setDados(task);
    setIsOpen(true);
  };

  if (loading) return <div className="p-6 text-gray-400">Carregando...</div>;
  if (error) return <div className="p-6 text-red-500">{error}</div>;

  // Cálculo dinâmico dos cards
  const total = tarefas.length;
  const pending = tarefas.filter((t) => t.task_status).length;
  const completed = tarefas.filter((t) => !t.task_status).length;

  return (
    <div className="min-h-screen bg-[#101010] text-gray-200">
      {/* Cards resumo */}
      <div className="max-w-5xl mx-auto flex flex-wrap gap-4 justify-center py-6">
        <Cards title="All Tasks" value={total} />
        <Cards title="Pending" value={pending} />
        <Cards title="Completed" value={completed} />
      </div>

      {/* Tabela de tarefas */}
      <div className="max-w-5xl mx-auto px-4">
        <Header title="ALL TASKS" fetchTarefas={() => { fetchTarefas() }} />

        {isOpen && (
          <DialogForm
            setIsOpen={setIsOpen}
            fetchTarefas={() => { fetchTarefas() }}
            dados={dados}
          />
        )}
        {showDeleteDialog && (
          <DialogDelete
            onConfirm={() => {
              handleDelete(tarefaParaDeletar.id);
              setShowDeleteDialog(false);
            }}
            onCancel={() => setShowDeleteDialog(false)}
          />
        )}

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
