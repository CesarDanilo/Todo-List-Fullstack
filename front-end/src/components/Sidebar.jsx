import { useState } from 'react';
import logo from '../img/logo/t.png';

export default function Sidebar({ onSelect }) {
    const [activeItem, setActiveItem] = useState('ALL TASKS');

    const handleItemClick = (item) => {
        setActiveItem(item);
        onSelect(item);
    };

    return (
        <div className="w-[350px] text-white p-10" style={{ backgroundColor: '#f1f1eb' }}>
            {/* Logo */}
            <div className="mb-12">
                <img src={logo} alt="logo" className="w-[200px] h-auto" />
            </div>

            {/* Menu de navegação */}
            <div className="mb-12">
                <ul className="space-y-4">
                    {['ALL TASKS', 'PENDING', 'COMPLETED', 'TRASH'].map((item) => {
                        const count = {
                            'ALL TASKS': 60,
                            'PENDING': 40,
                            'COMPLETED': 20,
                            'TRASH': 12
                        }[item];

                        return (
                            <li
                                key={item}
                                className={`flex justify-between items-center cursor-pointer text-gray-950 font-bold font-sans text-lg hover:bg-[#E4E4E4] p-2 rounded ${activeItem === item ? 'border-l-4 border-black bg-[#E4E4E4]' : ''
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
                CÉSAR DANILO
            </div>
        </div>
    );
}