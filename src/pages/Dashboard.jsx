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

  useEffect(() => {
    if (!user) {
      navigate('/login');
      return;
    }
    API.get('case-studies/')
      .then(res => setCases(res.data))
      .catch(err => console.error('Failed to load case studies:', err));
  }, [user, navigate]);

  if (!user) return null;

  return (
    <div className={`${className} min-h-screen p-6 space-y-6`}>
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center">
        <div className="space-y-2">
          <h2 className="text-xl">Welcome, <span className="font-semibold">{user.username}</span>!</h2>
          <h1 className="text-3xl font-bold">Your Dashboard</h1>
        </div>
        <div className="flex space-x-3 mt-4 sm:mt-0">
          <Link
            to="/"
            className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
          >
            Home
          </Link>
          <Link
            to="/dashboard/analytics"
            className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
          >
            Analytics
          </Link>
          <button
            onClick={() => {
              logout();
              navigate('/');
            }}
            className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
          >
            Logout
          </button>
        </div>
      </div>

      {/* Theme Selector */}
      <ThemeSelector />

      {/* Create New Case Study */}
      <div>
        <Link
          to="/dashboard/edit/new"
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          + Create New Case Study
        </Link>
      </div>

      {/* Case Study List */}
      {cases.length === 0 ? (
        <p className="text-gray-500">
          You haven’t created any case studies yet.{' '}
          <Link to="/dashboard/edit/new" className="underline text-blue-600 hover:text-blue-800">
            Create your first one!
          </Link>
        </p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {cases.map(cs => (
            <div key={cs.id} className="flex flex-col">
              <CaseStudyCard study={cs} username={cs.owner_username} />
              {cs.owner_username === user.username && (
                <Link
                  to={`/dashboard/edit/${cs.id}`}
                  className="mt-2 px-3 py-1 bg-yellow-500 text-white rounded text-center hover:bg-yellow-600"
                >
                  Edit
                </Link>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
