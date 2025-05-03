import { useState } from 'react';
import Sidebar from './components/Sidebar';
import MainContent from './components/MainContent';

function App() {
  const [selectedItem, setSelectedItem] = useState('Item 1');

  return (
    <div className="flex h-screen">
      <Sidebar onSelect={setSelectedItem} />
      <MainContent selected={selectedItem} />
    </div>
  );
}

export default App;
