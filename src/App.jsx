// src/App.jsx

import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { ThemeProvider } from './contexts/ThemeContext';
import Layout from './components/Layout';

import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import CaseEditor from './pages/CaseEditor';
import AnalyticsDashboard from './pages/AnalyticsDashboard';
import PublicPortfolio from './pages/PublicPortfolio';
import CaseStudyPage from './pages/CaseStudyPage';

export default function App() {
  return (
    <AuthProvider>
      <ThemeProvider>
        <BrowserRouter>
          <Layout>
            <Routes>
              {/* Public landing/auth */}
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />

              {/* Creator */}
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/dashboard/edit/:id" element={<CaseEditor />} />
              <Route path="/dashboard/analytics" element={<AnalyticsDashboard />} />

              {/* Single Case Study must come before the portfolio route */}
              <Route path="/:username/:slug" element={<CaseStudyPage />} />

              {/* Public Portfolio (all case studies) */}
              <Route path="/:username" element={<PublicPortfolio />} />

              {/* Catch-all */}
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </Layout>
        </BrowserRouter>
      </ThemeProvider>
    </AuthProvider>
  );
}
