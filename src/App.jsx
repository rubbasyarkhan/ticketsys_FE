import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import DashboardLayout from './layouts/DashboardLayout';

// Pages
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Tickets from './pages/Tickets';
import TicketDetail from './pages/TicketDetail';
import Agents from './pages/Agents';
import AgentDetail from './pages/AgentDetail';
import CreateAgent from './pages/CreateAgent';

function App() {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          {/* Public Routes */}
          <Route path="/login" element={<Login />} />

          {/* Protected Dashboard Routes */}
          <Route
            element={
              <ProtectedRoute>
                <DashboardLayout />
              </ProtectedRoute>
            }
          >
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/tickets" element={<Tickets />} />
            <Route path="/tickets/:id" element={<TicketDetail />} />

            {/* Admin Only Routes */}
            <Route
              path="/admin/agents"
              element={
                <ProtectedRoute adminOnly={true}>
                  <Agents />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/agents/new"
              element={
                <ProtectedRoute adminOnly={true}>
                  <CreateAgent />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/agents/:id"
              element={
                <ProtectedRoute adminOnly={true}>
                  <AgentDetail />
                </ProtectedRoute>
              }
            />
          </Route>

          {/* Fallback */}
          <Route path="/" element={<Navigate to="/dashboard" replace />} />
          <Route path="*" element={<Navigate to="/dashboard" replace />} />
        </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;
