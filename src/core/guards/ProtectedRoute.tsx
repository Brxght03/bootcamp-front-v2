import { Navigate, useLocation } from 'react-router-dom';
import { JSX, useEffect } from 'react';
import { useAuth } from '../../hooks/UseAuth.hook';

interface ProtectedRouteProps {
  children: JSX.Element;
}

function ProtectedRoute({ children }: ProtectedRouteProps) {
  // ปิดการตรวจสอบชั่วคราวและคืนค่าเนื้อหาทันที
  return children;

  /* ปิดการทำงานชั่วคราว - เอาคอมเมนต์ออกเมื่อต้องการเปิดใช้งาน
  const { isAuthenticated, checkAuth } = useAuth();
  const location = useLocation();

  useEffect(() => {
    checkAuth && checkAuth();
  }, [checkAuth]);

  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location.pathname }} replace />;
  }

  return children;
  */
}

export default ProtectedRoute;