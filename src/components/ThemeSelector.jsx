import React, { useContext } from 'react';
import { ThemeContext } from '../contexts/ThemeContext';

export default function ThemeSelector() {
  const ctx = useContext(ThemeContext) || {};
  const { theme = 'default', setTheme = () => {}, themes = {} } = ctx;

  // Safely get entries (won’t crash if themes is somehow null)
  const entries = Array.isArray(Object.entries(themes))
    ? Object.entries(themes)
    : [];

  return (
    <div className="p-4 border rounded mb-6">
      <h2 className="text-lg font-semibold mb-2">Choose Site Theme</h2>
      <div className="flex space-x-3">
        {entries.map(([key]) => (
          <button
            key={key}
            onClick={() => setTheme(key)}
            className={`
              px-4 py-2 rounded focus:outline-none
              ${theme === key ? 'ring-2 ring-blue-500' : 'opacity-70 hover:opacity-90'}
            `}
          >
            {key.charAt(0).toUpperCase() + key.slice(1)}
          </button>
        ))}
      </div>
    </div>
  );
}
