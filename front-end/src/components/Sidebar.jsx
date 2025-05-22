import { useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import logo from '../img/logo/2.png';
import { contextNumberTasks } from '../context/total_number_of_tasks';

export default function Sidebar({ onSelect }) {
  const [activeItem, setActiveItem] = useState('ALL TASKS');
  const {
    tarefasLength,
    setTarefasLength,
    pendingTarefasLength,
    setPendingTarefasLength,
    completedTarefasLength,
    setCompletedTarefasLength
  } = useContext(contextNumberTasks);

  const [name, setName] = useState('');
  const [userId, setUserId] = useState(null);
  const navigate = useNavigate();

  const apiUrl = import.meta.env.VITE_API_URL_TASKS

  useEffect(() => {
    const userString = localStorage.getItem('user');
    if (!userString) return;

    try {
      const user = JSON.parse(userString);
      if (user?.name) setName(user.name);
      if (user?.userId) setUserId(user.userId);
    } catch (error) {
      console.error('Erro ao obter usuário do localStorage:', error);
    }
  }, []);

  useEffect(() => {
    if (!userId) return; // aguarda o userId estar carregado

    const atualizarContadoresGlobais = async () => {
      try {
        const [allRes, pendingRes, completedRes] = await Promise.all([
          axios.get(`${apiUrl}tarefas/?user_id=${userId}`),
          axios.get(`${apiUrl}tarefas/?user_id=${userId}&task_status=true`),   // pendentes
          axios.get(`${apiUrl}tarefas/?user_id=${userId}&task_status=false`)  // completas
        ]);

        const total = allRes.data.length;
        const pendentes = pendingRes.data.length;
        const completas = completedRes.data.length;

        console.log({ total, pendentes, completas });

        setTarefasLength(total);
        setPendingTarefasLength(pendentes);
        setCompletedTarefasLength(completas);
      } catch (error) {
        console.error('Erro ao buscar tarefas:', error);
      }
    };

    atualizarContadoresGlobais();
  }, [userId]); // só executa quando userId estiver disponível

  const handleItemClick = (item) => {
    setActiveItem(item);
    onSelect(item);
  };

  const handleLogoutClick = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/');
  };

  return (
    <div className="w-full md:w-[350px] p-3 md:p-6 bg-[#0f0f0f] text-[#e5e5e5] font-sans flex flex-col justify-between ">
      {/* Logo - Reduzido e com menos margem */}
      <div className="mb-4 md:mb-6 flex justify-center">
        <img src={logo} alt="Logo" className="w-[80px] md:w-[110px] h-auto" />
      </div>

      {/* Navegação - Mais compacta */}
      <nav className="mb-4 md:mb-6">
        <ul className="space-y-1 md:space-y-2">
          {[
            { label: 'ALL TASKS', count: tarefasLength },
            { label: 'PENDING', count: pendingTarefasLength },
            { label: 'COMPLETED', count: completedTarefasLength }
          ].map(({ label, count }) => (
            <li
              key={label}
              onClick={() => handleItemClick(label)}
              className={`flex justify-between items-center cursor-pointer px-2 py-1 md:px-3 md:py-1.5 rounded-md transition-colors
            ${activeItem === label
                  ? 'bg-[#1c1c1c] border-l-4 border-indigo-500 text-indigo-400 font-semibold'
                  : 'hover:bg-[#1f1f1f] text-[#e5e5e5]'}`}
            >
              <span className="text-xs md:text-sm">{label}</span>
              <span className="bg-[#2a2a2a] text-white rounded-full px-1.5 py-0.5 md:px-2 md:py-0.5 text-xs">
                {count}
              </span>
            </li>
          ))}
        </ul>
      </nav>

      {/* Rodapé - Mais compacto */}
      <footer className="text-[#e5e5e5] font-medium text-sm md:text-base flex justify-between items-center">
        <span>{name || 'Usuário'}</span>
        <button
          onClick={handleLogoutClick}
          className="p-1 rounded hover:bg-[#1f1f1f] transition-colors"
          aria-label="Logout"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-4 h-4 md:w-5 md:h-5"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="#e5e5e5"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M8.25 9V5.25A2.25 2.25 0 0 1 10.5 3h6a2.25 2.25 0 0 1 2.25 2.25v13.5A2.25 2.25 0 0 1 16.5 21h-6a2.25 2.25 0 0 1-2.25-2.25V15m-3 0-3-3m0 0 3-3m-3 3H15"
            />
          </svg>
        </button>
      </footer>
    </div>
  );
}
