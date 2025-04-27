// src/pages/AnalyticsDashboard.jsx

import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
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

  // Redirect unauthenticated users
  useEffect(() => {
    if (!user) {
      navigate('/login');
    }
  }, [user, navigate]);

  // Fetch analytics summary (includes per_case)
  useEffect(() => {
    if (!user) return;
    getAnalyticsSummary()
      .then(res => {
        setStats(res.data);
        setLoading(false);
      })
      .catch(err => {
        if (err.response?.status === 401) {
          navigate('/login');
        } else {
          console.error('Analytics fetch error:', err);
          setLoading(false);
        }
      });
  }, [user, navigate]);

  if (!user) return null;
  if (loading) return <div className="p-6">Loading analytics...</div>;
  if (!stats) return <div className="p-6">No analytics data available.</div>;

  const cardBg = theme === 'modern' ? 'bg-gray-800' : 'bg-white';
  const cardText = theme === 'modern' ? 'text-white' : 'text-black';
  const titleClass = `${theme === 'modern' ? 'text-white' : 'text-black'} text-2xl font-bold mb-6`;

  return (
    <div className="min-h-screen p-6">
      <h1 className={titleClass}>Analytics Dashboard</h1>

      {/* Per-case study metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
        {stats.per_case.map(item => (
          <div
            key={item.case_study__id}
            className={`${cardBg} ${cardText} p-4 rounded shadow`}
          >
            <h2 className="text-lg font-semibold mb-2">{item.case_study__title}</h2>
            <p className="text-sm">Views: <span className="font-bold">{item.views}</span></p>
            <p className="text-sm">Clicks: <span className="font-bold">{item.clicks}</span></p>
          </div>
        ))}
      </div>

      {/* Bar chart overview */}
      <div className={`${cardBg} p-4 rounded shadow`}>
        <h2 className={`text-lg font-semibold mb-4 ${cardText}`}>Overall Breakdown</h2>
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
                color: theme === 'modern' ? '#fff' : '#000'
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
