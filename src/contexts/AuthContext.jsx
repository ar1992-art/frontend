import { createContext, useState, useEffect } from 'react';
import API, { setToken, clearToken } from '../services/api';

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  // on mount, restore tokens & fetch /me
  useEffect(() => {
    const access = localStorage.getItem('access');
    if (access) {
      setToken(access);
      API.get('auth/me/')
        .then(res => setUser(res.data))
        .catch(() => {
          clearToken();
          localStorage.removeItem('access');
          localStorage.removeItem('refresh');
        });
    }
  }, []);

  // login: token pair → set → fetch profile
  const login = async ({ username, password }) => {
    const { data } = await API.post('auth/login/', { username, password });
    // data: { access, refresh }
    setToken(data.access);
    localStorage.setItem('access', data.access);
    localStorage.setItem('refresh', data.refresh);
    const me = await API.get('auth/me/');
    setUser(me.data);
    return me.data;
  };

  // register: create → then login
  const register = async ({ username, email, password1, password2 }) => {
    await API.post('auth/register/', { username, email, password1, password2 });
    return login({ username, password: password1 });
  };

  // refresh token helper
  const refreshToken = async () => {
    const refresh = localStorage.getItem('refresh');
    if (!refresh) throw new Error('No refresh token');
    const { data } = await API.post('auth/refresh/', { refresh });
    setToken(data.access);
    localStorage.setItem('access', data.access);
    return data.access;
  };

  const logout = () => {
    clearToken();
    localStorage.removeItem('access');
    localStorage.removeItem('refresh');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, register, refreshToken, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
