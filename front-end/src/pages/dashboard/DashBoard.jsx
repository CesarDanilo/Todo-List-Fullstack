import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../../components/Sidebar';
import MainContent from '../../components/MainContent';
import { contextNumberTasks } from '../../context/total_number_of_tasks';

export default function Dashboard() {
    const [selectedItem, setSelectedItem] = useState('Item 1');
    const [tarefasLength, setTarefasLength] = useState(0);
    const [pendingTarefasLength, setPendingTarefasLength] = useState(0);
    const [completedTarefasLength, setCompletedTarefasLength] = useState(0);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const checkAuthentication = () => {
            const token = localStorage.getItem('token');
            if (!token) {
                navigate('/usuarios/auth');
                return false;
            }
            setIsAuthenticated(true);
            return true;
        };

        checkAuthentication();
    }, [navigate]);

    if (!isAuthenticated) {
        return null; // or a loading spinner while redirecting
    }

    return (
        <div className="flex h-screen">
            <contextNumberTasks.Provider
                value={{
                    tarefasLength,
                    setTarefasLength,
                    pendingTarefasLength,
                    setPendingTarefasLength,
                    completedTarefasLength,
                    setCompletedTarefasLength
                }}
            >
                <Sidebar onSelect={setSelectedItem} />
                <MainContent selected={selectedItem} />
            </contextNumberTasks.Provider>
        </div>
    );
}