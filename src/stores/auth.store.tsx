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
  checkAuth: () => boolean; // เพิ่มฟังก์ชันตรวจสอบสถานะการล็อกอิน
}

export const AuthStore = createContext<AuthStateProps | undefined>(undefined);

export const AuthStoreProvider = ({ children }: { children: ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userRole, setUserRole] = useState<UserRole | null>(null);
  const [userId, setUserId] = useState<string | null>(null);

  // ฟังก์ชันตรวจสอบสถานะการล็อกอินจาก localStorage
  const checkAuth = (): boolean => {
    try {
      const storedAuth = localStorage.getItem(LOCAL_STORAGE_KEY);
      if (storedAuth) {
        const authData = JSON.parse(storedAuth);
        
        // ตรวจสอบว่าข้อมูลถูกต้องหรือไม่
        if (authData && (authData.userId || authData.role)) {
          setIsAuthenticated(true);
          setUserRole(authData.role || 'student');
          setUserId(authData.userId || null);
          return true;
        }
      }
      return false;
    } catch (e) {
      // หากการแปลง JSON ล้มเหลว ให้ลบข้อมูลใน localStorage
      console.error("Error checking auth state:", e);
      localStorage.removeItem(LOCAL_STORAGE_KEY);
      return false;
    }
  };

  useEffect(() => {
    // ดึงข้อมูลการล็อกอินจาก localStorage เมื่อโหลดแอป
    checkAuth();
  }, []);

  const login = (userId = '', role?: UserRole) => {
    console.log('Login with userId:', userId);
    
    // จำลองตรวจสอบบทบาทตามรหัสนิสิต
    // สำหรับการทดสอบ: 
    // รหัสนิสิตที่ขึ้นต้นด้วย '2' จะเป็นเจ้าหน้าที่ (staff)
    // รหัสนิสิตที่ขึ้นต้นด้วย '1' จะเป็นแอดมิน (admin)
    // รหัสนิสิตอื่นๆ เป็นนิสิตทั่วไป (student)
    
    let userRole: UserRole = 'student';
    
    if (role) {
      // ถ้ามีการระบุบทบาทมาโดยตรง ให้ใช้ค่านั้น
      userRole = role;
    } else if (userId.startsWith('2')) {
      userRole = 'staff';
      console.log('Detected staff role from ID');
    } else if (userId.startsWith('1')) {
      userRole = 'admin';
      console.log('Detected admin role from ID');
    }
    
    console.log('Setting user role to:', userRole);
    
    setIsAuthenticated(true);
    setUserRole(userRole);
    setUserId(userId);
    
    // บันทึกข้อมูลการล็อกอินใน localStorage
    const authData = { userId, role: userRole };
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(authData));
  };

  const logout = () => {
    setIsAuthenticated(false);
    setUserRole(null);
    setUserId(null);
    localStorage.removeItem(LOCAL_STORAGE_KEY);
  };

  return (
    <AuthStore.Provider value={{ isAuthenticated, userRole, userId, login, logout, checkAuth }}>
      {children}
    </AuthStore.Provider>
  );
};