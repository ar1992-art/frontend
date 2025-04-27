// src/pages/Home.jsx

import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext';

export default function Home() {
  const { user, logout } = useContext(AuthContext);
  const [usernameInput, setUsernameInput] = useState('');
  const [caseSlug, setCaseSlug] = useState('');
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const goToPortfolio = e => {
    e.preventDefault();
    if (usernameInput.trim()) {
      navigate(`/${usernameInput.trim()}`);
    }
  };

  const goToCaseStudy = e => {
    e.preventDefault();
    if (usernameInput.trim() && caseSlug.trim()) {
      navigate(`/${usernameInput.trim()}/${caseSlug.trim()}`);
    }
  };

  return (
    <div className="max-w-xl mx-auto p-6 space-y-8">
      {/* Auth header */}
      {user ? (
        <div className="flex justify-between items-center mb-6">
          <p className="text-lg">Welcome, <span className="font-semibold">{user.username}</span></p>
          <button
            onClick={handleLogout}
            className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
          >
            Logout
          </button>
        </div>
      ) : (
        <div className="flex space-x-4 mb-6">
          <Link
            to="/login"
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Login
          </Link>
          <Link
            to="/register"
            className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
          >
            Register
          </Link>
        </div>
      )}

      <h1 className="text-4xl font-bold">ProjectShelf</h1>
      <p className="text-lg">
        Dynamic portfolios &amp; case studies for designers, developers, and writers.
      </p>

      {/* Creator links if logged in */}
      {user && (
        <nav className="flex space-x-4 mt-4">
          <Link
            to="/dashboard"
            className="px-4 py-2 bg-indigo-500 text-white rounded hover:bg-indigo-600"
          >
            Dashboard
          </Link>
          <Link
            to="/dashboard/edit/new"
            className="px-4 py-2 bg-purple-500 text-white rounded hover:bg-purple-600"
          >
            New Case Study
          </Link>
          <Link
            to="/dashboard/analytics"
            className="px-4 py-2 bg-teal-500 text-white rounded hover:bg-teal-600"
          >
            Analytics
          </Link>
        </nav>
      )}

      {/* Public Portfolio Form */}
      <div className="mt-8">
        <h2 className="text-2xl font-semibold mb-2">View a Public Portfolio</h2>
        <form onSubmit={goToPortfolio} className="flex space-x-2">
          <input
            type="text"
            value={usernameInput}
            onChange={e => setUsernameInput(e.target.value)}
            placeholder="Username"
            className="flex-grow px-3 py-2 border rounded"
          />
          <button
            type="submit"
            className="px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700"
          >
            Go
          </button>
        </form>
      </div>

      {/* Public Case Study Form */}
      <div className="mt-6">
        <h2 className="text-2xl font-semibold mb-2">View a Public Case Study</h2>
        <form onSubmit={goToCaseStudy} className="flex space-x-2">
          <input
            type="text"
            value={usernameInput}
            onChange={e => setUsernameInput(e.target.value)}
            placeholder="Username"
            className="w-1/2 px-3 py-2 border rounded"
          />
          <input
            type="text"
            value={caseSlug}
            onChange={e => setCaseSlug(e.target.value)}
            placeholder="Case Slug"
            className="w-1/2 px-3 py-2 border rounded"
          />
          <button
            type="submit"
            className="px-4 py-2 bg-teal-600 text-white rounded hover:bg-teal-700"
          >
            Go
          </button>
        </form>
      </div>

      {/* Example quick-links */}
      <div className="mt-4 text-sm text-gray-600 space-y-1">
        <p>Or try these examples:</p>
        <Link to="/johndoe" className="underline hover:text-purple-600 block">
          /johndoe (portfolio)
        </Link>
        <Link to="/johndoe/my-first-case" className="underline hover:text-purple-600 block">
          /johndoe/my-first-case (case study)
        </Link>
      </div>
    </div>
  );
}
