import { useState } from 'react';
import Sidebar from './components/Sidebar';
import MainContent from './components/MainContent';
import { contextNumberTasks } from './context/total_number_of_tasks';
function App() {
  const [selectedItem, setSelectedItem] = useState('Item 1');
  const [tarefasLength, setTarefasLength] = useState();

  return (
    <div className="flex h-screen">
      <contextNumberTasks.Provider value={{ tarefasLength, setTarefasLength }}>
        <Sidebar onSelect={setSelectedItem} />
        <MainContent selected={selectedItem} />
      </contextNumberTasks.Provider >
    </div>
  );
}

export default App;
