import { BrowserRouter, Route, Routes } from "react-router-dom";
import LoginScreen from "./pages/auth/login_screen";
import Dashboard from "./pages/dashboard/DashBoard";
import HomePage from "./pages/home";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/usuarios/auth" element={<LoginScreen />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/" element={<HomePage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
