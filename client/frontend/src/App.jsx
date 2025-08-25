// client/src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Layout from './components/Layout';
import HomePage from './pages/HomePage';
import RegisterPage from './pages/RegisterPage';
import LoginPage from './pages/LoginPage';
import DashboardPage from './pages/DashboardPage';
import AnalyticsPage from './pages/AnalyticsPage';
import HistoryPage from './pages/HistoryPage';
import AdminDashboardPage from './pages/AdminDashboardPage';
import AdminRoute from './components/AdminRoute';
import './index.css';

function App() {
  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<HomePage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/login" element={<LoginPage />} />

        {/* Protected User Routes with Layout */}
        <Route path="/dashboard" element={<Layout><DashboardPage /></Layout>} />
        <Route path="/analytics" element={<Layout><AnalyticsPage /></Layout>} />
        <Route path="/history" element={<Layout><HistoryPage /></Layout>} />
        
        {/* Protected Admin Route with Layout */}
        <Route element={<AdminRoute />}>
          <Route path="/admin" element={<Layout><AdminDashboardPage /></Layout>} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;