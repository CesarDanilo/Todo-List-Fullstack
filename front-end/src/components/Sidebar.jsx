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
          axios.get(`http://localhost:3001/tarefas/?user_id=${userId}`),
          axios.get(`http://localhost:3001/tarefas/?user_id=${userId}&task_status=true`),   // pendentes
          axios.get(`http://localhost:3001/tarefas/?user_id=${userId}&task_status=false`)  // completas
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
    <div className="w-[350px] p-10 bg-[#0f0f0f] text-[#e5e5e5] font-sans flex flex-col justify-between h-screen">
      {/* Logo */}
      <div className="mb-12 flex justify-center">
        <img src={logo} alt="Logo" className="w-[150px] h-auto" />
      </div>

      {/* Navegação */}
      <nav className="mb-12">
        <ul className="space-y-4">
          {[
            { label: 'ALL TASKS', count: tarefasLength },
            { label: 'PENDING', count: pendingTarefasLength },
            { label: 'COMPLETED', count: completedTarefasLength }
          ].map(({ label, count }) => (
            <li
              key={label}
              onClick={() => handleItemClick(label)}
              className={`flex justify-between items-center cursor-pointer px-4 py-2 rounded-md transition-colors
                ${activeItem === label
                  ? 'bg-[#1c1c1c] border-l-4 border-indigo-500 text-indigo-400 font-semibold'
                  : 'hover:bg-[#1f1f1f] text-[#e5e5e5]'}`}
            >
              <span>{label}</span>
              <span className="bg-[#2a2a2a] text-white rounded-full px-3 py-1 text-sm">
                {count}
              </span>
            </li>
          ))}
        </ul>
      </nav>

      {/* Rodapé */}
      <footer className="text-[#e5e5e5] font-semibold text-lg flex justify-between items-center">
        <span>{name || 'Usuário'}</span>
        <button
          onClick={handleLogoutClick}
          className="p-2 rounded hover:bg-[#1f1f1f] transition-colors"
          aria-label="Logout"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-6 h-6"
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
