import "./App.css";

import { Route, Routes } from "react-router-dom";

import Dashboard from "./pages/Dashboard.jsx";
import Login from "./pages/Login.jsx";
import Register from "./pages/Register.jsx";
import { TechProvider } from "./context/TechContext.jsx";

function App() {
  return (
    <TechProvider>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </TechProvider>
  );
}

export default App;
