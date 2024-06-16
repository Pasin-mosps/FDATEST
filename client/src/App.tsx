import './App.css';
import React, { useContext } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';

import Register from './page/register';
import Login from './page/login';
import Home from './components/home';
import DashboardClient from './page/DashboardClient';
import DashboardAdmin from './page/DashboardAdmin';
import { UserContext } from './auth/UserContext';

const App: React.FC = () => {
  const { state } = useContext(UserContext);
  const token = localStorage.getItem("token");
  const userRole = state.role || (token ? JSON.parse(atob(token.split('.')[1])).role : null);

  return (
    <div>
      <Routes>
        <Route path="/" element={<Home role={state.role} />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route 
          path="/dashboardclient" 
          element={token ? (userRole === 'client' ? <DashboardClient /> : <Navigate to="/login" />) : <Navigate to="/login" />} 
        />
        <Route 
          path="/dashboardadmin" 
          element={token ? (userRole === 'admin' ? <DashboardAdmin /> : <Navigate to="/dashboardclient" />) : <Navigate to="/login" />} 
        />
      </Routes>
    </div>
  );
};

export default App;
