import React, { createContext, useState } from 'react';

// Define your themes up front
export const themes = {
  default: 'bg-white text-black',
  modern: 'bg-gray-900 text-white',
  minimal: 'bg-neutral-100 text-neutral-900',
};

// Create context with a safe default value
export const ThemeContext = createContext({
  theme: 'default',
  setTheme: () => {},
  className: themes.default,
  themes,
});

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState('default');
  const className = themes[theme] || themes.default;

  return (
    <ThemeContext.Provider value={{ theme, setTheme, className, themes }}>
      {children}
    </ThemeContext.Provider>
  );
}
