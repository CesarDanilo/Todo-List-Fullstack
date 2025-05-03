import logo from '../img/logo/t.png';

export default function Sidebar({ onSelect }) {
    return (
        <div className="w-[300px] text-white p-10" style={{ backgroundColor: '#f1f1eb' }}>
            {/* Logo */}
            <div className="mb-12">
                <img src={logo} alt="logo" className="w-[200px] h-auto" />
            </div>

            {/* Menu de navegação */}
            <div className="mb-12">
                <ul className="space-y-4">
                    <li
                        className="flex justify-between items-center cursor-pointer text-gray-950 font-bold font-sans text-lg"
                        onClick={() => onSelect('ALL TASKS')}
                    >
                        <span>ALL TASKS</span>
                        <span className="bg-gray-200 text-gray-700 rounded-full px-3 py-1 text-sm">60</span>
                    </li>
                    <li
                        className="flex justify-between items-center cursor-pointer text-gray-950 font-bold font-sans text-lg"
                        onClick={() => onSelect('PENDING')}
                    >
                        <span>PENDING</span>
                        <span className="bg-gray-200 text-gray-700 rounded-full px-3 py-1 text-sm">40</span>
                    </li>
                    <li
                        className="flex justify-between items-center cursor-pointer text-gray-950 font-bold font-sans text-lg"
                        onClick={() => onSelect('COMPLETED')}
                    >
                        <span>COMPLETED</span>
                        <span className="bg-gray-200 text-gray-700 rounded-full px-3 py-1 text-sm">20</span>
                    </li>
                    <li
                        className="flex justify-between items-center cursor-pointer text-gray-950 font-bold font-sans text-lg"
                        onClick={() => onSelect('TRASH')}
                    >
                        <span>TRASH</span>
                        <span className="bg-gray-200 text-gray-700 rounded-full px-3 py-1 text-sm">12</span>
                    </li>
                </ul>
            </div>

            {/* Rodapé com nome */}
            <div className="text-gray-950 font-bold font-sans text-lg">
                CÉSAR DANILO
            </div>
        </div>
    );
}