// src/pages/AnalyticsDashboard.jsx

import React, { useState, useEffect, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext';
import { ThemeContext } from '../contexts/ThemeContext';
import { getAnalyticsSummary } from '../services/api';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend
} from 'recharts';

export default function AnalyticsDashboard() {
  const { user } = useContext(AuthContext);
  const { theme } = useContext(ThemeContext);
  const navigate = useNavigate();
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  // Redirect if not logged in
  useEffect(() => {
    if (!user) navigate('/login');
  }, [user, navigate]);

  // Fetch only your portfolio’s stats
  useEffect(() => {
    if (!user) return;
    getAnalyticsSummary()
      .then(res => {
        setStats(res.data);
        setLoading(false);
      })
      .catch(err => {
        console.error('Analytics fetch error:', err);
        setLoading(false);
      });
  }, [user]);

  if (!user) return null;
  if (loading) return <div className="p-6">Loading analytics...</div>;

  // If no case studies, prompt to create one
  if (stats.per_case.length === 0) {
    return (
      <div className="p-6 space-y-4">
        <h1 className={`text-2xl font-bold ${theme === 'modern' ? 'text-white' : 'text-black'}`}>
          Analytics Dashboard
        </h1>
        <p>You have not created any case studies yet.</p>
        <br></br>
        <Link
          to="/dashboard/edit/new"
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Create Your First Case Study
        </Link>
      </div>
    );
  }

  const cardBg = theme === 'modern' ? 'bg-gray-800' : 'bg-white';
  const cardText = theme === 'modern' ? 'text-white' : 'text-black';

  return (
    <div className="min-h-screen p-6 space-y-8">
      <h1 className={`text-2xl font-bold ${theme === 'modern' ? 'text-white' : 'text-black'}`}>
        Analytics Dashboard
      </h1>

      {/* Overall totals */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div className={`${cardBg} ${cardText} p-4 rounded shadow`}>
          <h2 className="text-lg font-semibold">Total Visits</h2>
          <p className="text-3xl">{stats.total_visits}</p>
        </div>
        <div className={`${cardBg} ${cardText} p-4 rounded shadow`}>
          <h2 className="text-lg font-semibold">Total Clicks</h2>
          <p className="text-3xl">{stats.total_clicks}</p>
        </div>
      </div>

      {/* Per-case study breakdown */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {stats.per_case.map(item => (
          <div
            key={item.case_study__id}
            className={`${cardBg} ${cardText} p-4 rounded shadow`}
          >
            <h3 className="text-lg font-semibold">{item.case_study__title}</h3>
            <p>Views: <strong>{item.views}</strong></p>
            <p>Clicks: <strong>{item.clicks}</strong></p>
          </div>
        ))}
      </div>

      {/* Bar chart */}
      <div className={`${cardBg} p-4 rounded shadow`}>
        <h2 className={`text-lg font-semibold mb-4 ${cardText}`}>
          Case Study Comparison
        </h2>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={stats.per_case}>
            <XAxis
              dataKey="case_study__title"
              tick={{ fill: theme === 'modern' ? '#fff' : '#000', fontSize: 12 }}
            />
            <YAxis tick={{ fill: theme === 'modern' ? '#fff' : '#000' }} />
            <Tooltip
              contentStyle={{
                backgroundColor: theme === 'modern' ? '#2d3748' : '#fff',
                color: theme === 'modern' ? '#fff' : '#000',
              }}
            />
            <Legend wrapperStyle={{ color: theme === 'modern' ? '#fff' : '#000' }} />
            <Bar dataKey="views" name="Views" fill="#3182ce" />
            <Bar dataKey="clicks" name="Clicks" fill="#2c5282" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
