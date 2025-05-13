import { BrowserRouter, Route, Routes } from "react-router-dom";
import LoginScreen from "./pages/auth/login_screen";
import Dashboard from "./pages/dashboard/DashBoard";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/usuarios/auth" element={<LoginScreen />} />
        <Route path="/" element={<Dashboard />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
