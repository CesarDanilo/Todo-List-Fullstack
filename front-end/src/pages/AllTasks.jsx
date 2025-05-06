import axios from 'axios';
import { useState, useEffect } from 'react';
import Header from '../components/Header';
import ActionsButtons from '../components/ActionsButtons';

export default function AllTasks() {
  const [tarefas, setTarefas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchTarefas = async () => {
    try {
      const response = await axios.get('http://localhost:3001/tarefas');

      // Verifica se a resposta tem dados e é um array
      if (response.data.data && Array.isArray(response.data.data)) {
        setTarefas(response.data.data);
      } else {
        throw new Error("Formato de dados inválido");
      }
      setTarefas(response.data.data);

    } catch (error) {
      console.error("Erro ao buscar tarefas:", error);
      setError(error.message || "Erro ao carregar tarefas");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTarefas();
  }, []);

  if (loading) return <div className="p-4">Carregando tarefas...</div>;
  if (error) return <div className="p-4 text-red-500">Erro: {error}</div>;

  // Verifica se tarefas é um array antes de mapear
  // if (!Array.isArray(tarefas) {
  //   return <div className="p-4 text-yellow-600">Dados recebidos em formato inválido</div>;
  // }

  // if (tarefas.length === 0) {
  //   return <div className="p-4">Nenhuma tarefa encontrada</div>;
  // }

  return (
    <div className="p-4">
      <Header title={'ALL TASKS'} onTaskSaved={fetchTarefas}/>
      <table className="min-w-full rounded-lg overflow-hidden shadow-sm">
        {/* Cabeçalho da tabela (mantido igual) */}
        <thead>
          <tr className="bg-[#f1f1eb]">
            <th className="px-6 py-4 text-left text-sm font-medium text-gray-700 border-b border-gray-200">Title</th>
            <th className="px-6 py-4 text-left text-sm font-medium text-gray-700 border-b border-gray-200">Descrição</th>
            <th className="px-6 py-4 text-left text-sm font-medium text-gray-700 border-b border-gray-200">Status</th>
            <th className="px-6 py-4 text-left text-sm font-medium text-gray-700 border-b border-gray-200">Data</th>
            <th className="px-6 py-4 text-left text-sm font-medium text-gray-700 border-b border-gray-200">Actions</th>
          </tr>
        </thead>

        <tbody className="bg-white divide-y divide-gray-100">
          {tarefas.map((tarefa) => (
            <tr key={tarefa.id || Math.random()} className="hover:bg-[#f9f9f5] transition-colors duration-150">
              <td className="px-6 py-4 text-sm font-medium text-gray-900">{tarefa.title || 'Sem título'}</td>
              <td className="px-6 py-4 text-sm text-gray-600">{tarefa.task_description || 'Sem descrição'}</td>
              <td className={`px-6 py-4 text-sm text-gray-600 ${tarefa.task_status ? "text-green-500" : "text-red-700"}`}>{tarefa.task_status ? 'active' : 'disabled' || 'Sem status'}</td>
              <td className="px-6 py-4 text-sm text-gray-600">
                {tarefa.data ? new Date(tarefa.data).toLocaleDateString() : 'Sem data'}
              </td>
              <td className="flex px-6 py-4 text-sm gap-1 text-gray-600">
                <ActionsButtons type={'Edit'} />
                <ActionsButtons type={'Delete'} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}