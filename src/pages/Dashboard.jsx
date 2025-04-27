// src/pages/Dashboard.jsx

import React, { useContext, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext';
import { ThemeContext } from '../contexts/ThemeContext';
import API from '../services/api';
import ThemeSelector from '../components/ThemeSelector';
import CaseStudyCard from '../components/CaseStudyCard';

export default function Dashboard() {
  const { user, logout } = useContext(AuthContext);
  const { className } = useContext(ThemeContext);
  const [cases, setCases] = useState([]);
  const navigate = useNavigate();

  // Fetch case studies on mount
  useEffect(() => {
    if (!user) {
      navigate('/login');
      return;
    }
    API.get('case-studies/')
      .then(res => setCases(res.data))
      .catch(err => {
        console.error('Failed to load case studies:', err);
      });
  }, [user, navigate]);

  if (!user) return null;

  return (
    <div className={`${className} min-h-screen p-6`}>
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-6">
        <h1 className="text-3xl font-bold mb-4 sm:mb-0">Dashboard</h1>
        <div className="flex space-x-4">
          <button
            onClick={() => {
              logout();
              navigate('/');
            }}
            className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
          >
            Logout
          </button>
          <Link
            to="/dashboard/analytics"
            className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
          >
            Analytics
          </Link>
        </div>
      </div>

      {/* Theme selector */}
      <ThemeSelector />

      {/* Create New Case Study */}
      <div className="mb-6">
        <Link
          to="/dashboard/edit/new"
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          + Create New Case Study
        </Link>
      </div>

      {/* List of Case Studies with Edit buttons */}
      {cases.length === 0 ? (
        <p className="text-gray-500">No case studies yet. Create one above!</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {cases.map(cs => (
            <div key={cs.id} className="flex flex-col">
              <CaseStudyCard study={cs} username={user.username} />
              <Link
                to={`/dashboard/edit/${cs.id}`}
                className="mt-2 px-3 py-1 bg-yellow-500 text-white rounded hover:bg-yellow-600 text-center"
              >
                Edit
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
