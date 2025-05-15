import { useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import logo from '../img/logo/t.png';
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
  const navigate = useNavigate();

  // Carrega nome do usuário e tarefas
  useEffect(() => {
    const getUserName = () => {
      try {
        const userString = localStorage.getItem('user');
        if (!userString) return;

        const user = JSON.parse(userString);
        if (user?.name) setName(user.name);
      } catch (error) {
        console.error('Erro ao obter usuário do localStorage:', error);
      }
    };

    const fetchTarefas = async () => {
      try {
        const [all, pending, completed] = await Promise.all([
          axios.get('http://localhost:3001/tarefas'),
          axios.get('http://localhost:3001/tarefas/?task_status=true'),
          axios.get('http://localhost:3001/tarefas/?task_status=false')
        ]);

        setTarefasLength(all?.data?.data?.length || 0);
        setPendingTarefasLength(pending?.data?.data?.length || 0);
        setCompletedTarefasLength(completed?.data?.data?.length || 0);
      } catch (error) {
        console.error('Erro ao buscar tarefas:', error);
      }
    };

    getUserName();
    fetchTarefas();
  }, []);

  const handleItemClick = (item) => {
    setActiveItem(item);
    onSelect(item);
  };

  const handleLogoutClick = () => {
    try {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      navigate('/usuarios/auth');
    } catch (error) {
      console.error('Erro ao tentar sair:', error);
    }
  };

  return (
    <div className="w-[350px] text-white p-10" style={{ backgroundColor: '#f1f1eb' }}>
      {/* Logo */}
      <div className="mb-12">
        <img src={logo} alt="logo" className="w-[200px] h-auto" />
      </div>

      {/* Navegação */}
      <div className="mb-12">
        <ul className="space-y-4">
          {[
            { label: 'ALL TASKS', count: tarefasLength },
            { label: 'PENDING', count: pendingTarefasLength },
            { label: 'COMPLETED', count: completedTarefasLength }
          ].map(({ label, count }) => (
            <li
              key={label}
              onClick={() => handleItemClick(label)}
              className={`flex justify-between items-center cursor-pointer text-gray-950 font-sans text-lg hover:bg-[#E4E4E4] p-2 rounded ${activeItem === label ? 'border-l-4 border-black bg-[#E4E4E4]' : ''
                }`}
            >
              <span>{label}</span>
              <span className="bg-gray-200 text-gray-700 rounded-full px-3 py-1 text-sm">
                {count}
              </span>
            </li>
          ))}
        </ul>
      </div>


      {/* Rodapé */}
      <div className="text-gray-950 font-bold font-sans text-lg flex justify-between items-center">
        <span>{name || 'Usuário'}</span>
        <button onClick={handleLogoutClick} className="cursor-pointer">
          <svg xmlns="http://www.w3.org/2000/svg" className="size-6" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 9V5.25A2.25 2.25 0 0 1 10.5 3h6a2.25 2.25 0 0 1 2.25 2.25v13.5A2.25 2.25 0 0 1 16.5 21h-6a2.25 2.25 0 0 1-2.25-2.25V15m-3 0-3-3m0 0 3-3m-3 3H15" />
          </svg>
        </button>
      </div>
    </div>
  );
}
