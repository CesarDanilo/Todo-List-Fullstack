import AllTasks from "../pages/dashboard/components/AllTasks.jsx";
import PendingTasks from "../pages/dashboard/components/PendingTasks.jsx";
import CompletedTasks from "../pages/dashboard/components/CompletedTasks.jsx";
// import Trash from "../pages/trash";

export default function MainContent({ selected }) {
    const renderContent = () => {
        switch (selected) {
            case 'ALL TASKS':
                return <AllTasks />;
            case 'PENDING':
                return <PendingTasks />;
            case 'COMPLETED':
                return <CompletedTasks />;
            // case 'TRASH':
            //     return <Trash />;
            default:
                return <AllTasks />;
        }
    };

    return (
        <div className="flex-1 p-4 sm:p-11 overflow-auto bg-[#0f0f0f] text-[#e5e5e5]">
            {renderContent()}
        </div>
    );
}
