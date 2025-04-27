// src/components/Layout.jsx
import { useContext } from 'react';
import { ThemeContext } from '../contexts/ThemeContext';

export default function Layout({ children }) {
  const { className } = useContext(ThemeContext);
  return (
    <div className={`${className} min-h-screen flex flex-col`}>
      {children}
    </div>
  );
}
