import { useState, useContext, useEffect } from 'react';
import logo from '../img/logo/t.png';
import { contextNumberTasks } from '../context/total_number_of_tasks';

export default function Sidebar({ onSelect }) {
    const [activeItem, setActiveItem] = useState('ALL TASKS');
    const { tarefasLength, pendingTarefasLength, completedTarefasLength } = useContext(contextNumberTasks);
    const [name, setName] = useState();

    const getNameLocalStorage = () => {
        try {
            const userString = localStorage.getItem('user');
            if (!userString) {
                console.warn('No user data found in localStorage');
                return;
            }

            const user = JSON.parse(userString);
            if (user && user.name) {
                setName(user.name);
            } else {
                console.warn('User name not found in localStorage data');
            }
        } catch (error) {
            console.error('Error parsing user data from localStorage:', error);
        }
    };

    const handleItemClick = (item) => {
        setActiveItem(item);
        onSelect(item);
    };

    useEffect(() => {
        getNameLocalStorage();
    }, []);
    
    return (
        <div className="w-[350px] text-white p-10" style={{ backgroundColor: '#f1f1eb' }}>
            {/* Logo */}
            <div className="mb-12">
                <img src={logo} alt="logo" className="w-[200px] h-auto" />
            </div>

            {/* Menu de navegação */}
            <div className="mb-12">
                <ul className="space-y-4">
                    {['ALL TASKS', 'PENDING', 'COMPLETED'].map((item) => {
                        const count = {
                            'ALL TASKS': tarefasLength,
                            'PENDING': pendingTarefasLength,
                            'COMPLETED': completedTarefasLength
                        }[item];

                        return (
                            <li
                                key={item}
                                className={`flex justify-between items-center cursor-pointer text-gray-950  font-sans text-lg hover:bg-[#E4E4E4] p-2 rounded ${activeItem === item ? 'border-l-4 border-black bg-[#E4E4E4]' : ''
                                    }`}
                                onClick={() => handleItemClick(item)}
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

            {/* Rodapé com nome */}
            <div className="text-gray-950 font-bold font-sans text-lg">
                {name}
            </div>
        </div>
    );
}