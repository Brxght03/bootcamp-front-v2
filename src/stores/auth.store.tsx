import { createContext, useEffect, useState, ReactNode } from 'react';

const LOCAL_STORAGE_KEY = 'isAuthenticated';

interface AuthStateProps {
  isAuthenticated: boolean;
  login: () => void;
  logout: () => void;
}

export const AuthStore = createContext<AuthStateProps | undefined>(undefined);
export const AuthStoreProvider = ({ children }: { children: ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const storedAuth = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (storedAuth === 'true') {
      setIsAuthenticated(true);
    }
  }, []);

  const login = () => {
    setIsAuthenticated(true);
    localStorage.setItem(LOCAL_STORAGE_KEY, 'true');
  };

  const logout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem(LOCAL_STORAGE_KEY);
  };

  return (
    <AuthStore.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthStore.Provider>
  );
};

