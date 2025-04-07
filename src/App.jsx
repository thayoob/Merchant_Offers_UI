import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { AuthProvider, useAuth } from './context/AuthContext';
import Sidebar from './components/layout/Sidebar';
import Navbar from './components/layout/Navbar';
import Merchant from './pages/Merchant';
import Login from './pages/Login';
import Offer from './pages/Offer';
import VoucherCode from './pages/VoucherCode';

const PrivateRoute = ({ children }) => {
  const { user, loading } = useAuth();

  if (loading) {
    return <div className="loader-container"><div className="spinner"></div></div>;
  }

  return user ? children : <Navigate to="/login" replace />;
};

const AppLayout = () => {
  return (
    <div className="dashboard-container">
      <Sidebar />
      <div className="main-wrapper">
        <Navbar />
        <main className="main-content">
          <Routes>
            <Route path="/Merchant" element={<Merchant />} />
            <Route path="/Offer" element={<Offer />} />
            <Route path="/VoucherCode" element={<VoucherCode />} />
          </Routes>
        </main>
      </div>
    </div>
  );
};

const App = () => {
  return (
    <Router>
      <AuthProvider>
        <Toaster position="top-right" reverseOrder={false} />

        <Routes>
          <Route path="/login" element={<Login />} />
          <Route
            path="/*"
            element={
              <PrivateRoute>
                <AppLayout />
              </PrivateRoute>
            }
          />
        </Routes>
      </AuthProvider>
    </Router>
  );
};

export default App;
