import { createContext, useEffect, useState, ReactNode } from 'react';

const LOCAL_STORAGE_KEY = 'authData';

// กำหนดประเภทของบทบาทผู้ใช้
export type UserRole = 'student' | 'staff' | 'admin';

interface AuthStateProps {
  isAuthenticated: boolean;
  userRole: UserRole | null;
  userId: string | null;
  login: (userId?: string, role?: UserRole) => void;
  logout: () => void;
}

export const AuthStore = createContext<AuthStateProps | undefined>(undefined);

export const AuthStoreProvider = ({ children }: { children: ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userRole, setUserRole] = useState<UserRole | null>(null);
  const [userId, setUserId] = useState<string | null>(null);

  useEffect(() => {
    // ดึงข้อมูลการล็อกอินจาก localStorage เมื่อโหลดแอป
    const storedAuth = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (storedAuth) {
      try {
        const authData = JSON.parse(storedAuth);
        setIsAuthenticated(true);
        setUserRole(authData.role || 'student');
        setUserId(authData.userId || null);
      } catch (e) {
        // หากการแปลง JSON ล้มเหลว ให้ลบข้อมูลใน localStorage
        localStorage.removeItem(LOCAL_STORAGE_KEY);
      }
    }
  }, []);

  const login = (userId = '', role: UserRole = 'student') => {
    setIsAuthenticated(true);
    setUserRole(role);
    setUserId(userId);
    
    // บันทึกข้อมูลการล็อกอินใน localStorage
    const authData = { userId, role };
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(authData));
  };

  const logout = () => {
    setIsAuthenticated(false);
    setUserRole(null);
    setUserId(null);
    localStorage.removeItem(LOCAL_STORAGE_KEY);
  };

  return (
    <AuthStore.Provider value={{ isAuthenticated, userRole, userId, login, logout }}>
      {children}
    </AuthStore.Provider>
  );
};