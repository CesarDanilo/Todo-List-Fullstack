import AllTasks from "../pages/allTasks";
import PendingTasks from "../pages/PendingTasks.jsx"; // Importe os outros componentes que você precisar
// import CompletedTasks from "../pages/completedTasks";
// import Trash from "../pages/trash";

export default function MainContent({ selected }) {
    // Função para renderizar o componente correto baseado na seleção
    const renderContent = () => {
        switch (selected) {
            case 'ALL TASKS':
                return <AllTasks />;
            case 'PENDING':
                return <PendingTasks />;
            // case 'COMPLETED':
            //     return <CompletedTasks />;
            // case 'TRASH':
            //     return <Trash />;
            default:
                return <AllTasks />; // Padrão para quando não houver seleção
        }
    };

    return (
        <div className="flex-1 p-11 overflow-auto justify-center align-middle" style={{ backgroundColor: '#f1f1eb' }}>
            {renderContent()}
        </div>
    );
}