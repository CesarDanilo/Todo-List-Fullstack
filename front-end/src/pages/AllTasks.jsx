import axios from 'axios'

export default function AllTasks() {

  const functionDadosDastarefas = async () => {
    try {
      const response = await axios.get('http://localhost:3001/tarefas');
      console.log(response)
    } catch (error) {
      console.log("não foi possivel buscar")
    }
  }

  functionDadosDastarefas();

  return (
    <div className="p-4">
      <table className="min-w-full rounded-lg overflow-hidden shadow-sm">
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
          <tr className="hover:bg-[#f9f9f5] transition-colors duration-150">
            <td className="px-6 py-4 text-sm font-medium text-gray-900">The Sliding Mr. Bones (Next Stop, Pottersville)</td>
            <td className="px-6 py-4 text-sm text-gray-600">Malcolm Lockyer</td>
            <td className="px-6 py-4 text-sm text-gray-600">1961</td>
            <td className="px-6 py-4 text-sm text-gray-600">1961</td>
            <td className="px-6 py-4 text-sm text-gray-600">1961</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}