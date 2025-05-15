import { useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import logo from '../img/logo/t.png';
import { contextNumberTasks } from '../context/total_number_of_tasks';

export default function Sidebar({ onSelect }) {
    const [activeItem, setActiveItem] = useState('ALL TASKS');
    const { tarefasLength, pendingTarefasLength, completedTarefasLength } = useContext(contextNumberTasks);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [name, setName] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const checkAuthentication = () => {
            const token = localStorage.getItem('token');
            if (!token) {
                navigate('/usuarios/auth');
                return;
            }
            setIsAuthenticated(true);
        };

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

        checkAuthentication();
        getUserName();
    }, [navigate]);

    const handleItemClick = (item) => {
        setActiveItem(item);
        onSelect(item);
    };

    const handleLogoutClick = () => {
        try {
            localStorage.removeItem('token');
            localStorage.removeItem('user');
            setIsAuthenticated(false);
            navigate('/usuarios/auth');
        } catch (error) {
            console.error('Erro ao tentar sair:', error);
        }
    };

    if (!isAuthenticated) {
        return null; // ou um loading spinner se preferir
    }

    return (
        <div className="w-[350px] text-white p-10" style={{ backgroundColor: '#f1f1eb' }}>
            {/* Logo */}
            <div className="mb-12">
                <img src={logo} alt="logo" className="w-[200px] h-auto" />
            </div>

            {/* Navegação */}
            <div className="mb-12">
                <ul className="space-y-4">
                    {['ALL TASKS', 'PENDING', 'COMPLETED'].map((item) => {
                        const count = {
                            'ALL TASKS': tarefasLength,
                            'PENDING': pendingTarefasLength,
                            'COMPLETED': completedTarefasLength,
                        }[item];

                        return (
                            <li
                                key={item}
                                onClick={() => handleItemClick(item)}
                                className={`flex justify-between items-center cursor-pointer text-gray-950 font-sans text-lg hover:bg-[#E4E4E4] p-2 rounded ${activeItem === item ? 'border-l-4 border-black bg-[#E4E4E4]' : ''
                                    }`}
                            >
                                <span>{item}</span>
                                <span className="bg-gray-200 text-gray-700 rounded-full px-3 py-1 text-sm">
                                    {count}
                                </span>
                            </li>
                        );
                    })}
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
