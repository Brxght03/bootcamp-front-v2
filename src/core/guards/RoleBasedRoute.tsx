import { Navigate, useLocation } from 'react-router-dom';
import { ReactNode } from 'react';
import { useAuth } from '../../hooks/UseAuth.hook';
import { UserRole } from '../../stores/auth.store';

interface RoleBasedRouteProps {
  children: ReactNode;
  allowedRoles: UserRole[];
}

/**
 * คอมโพเนนต์สำหรับการป้องกันเส้นทางตามบทบาทของผู้ใช้
 * ตรวจสอบว่าผู้ใช้มีสิทธิ์เข้าถึงเส้นทางหรือไม่ โดยตรวจสอบจากบทบาทที่อนุญาต
 */
function RoleBasedRoute({ children, allowedRoles }: RoleBasedRouteProps) {
  const { isAuthenticated, userRole } = useAuth();
  const location = useLocation();

  // ตรวจสอบว่าผู้ใช้ล็อกอินแล้วหรือไม่
  if (!isAuthenticated) {
    // เปลี่ยนเส้นทางไปยังหน้าล็อกอิน และบันทึกเส้นทางที่พยายามเข้าถึง
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // ตรวจสอบว่าผู้ใช้มีบทบาทที่อนุญาตหรือไม่
  if (userRole && allowedRoles.includes(userRole)) {
    return <>{children}</>;
  }

  // ถ้าผู้ใช้ไม่มีสิทธิ์ เปลี่ยนเส้นทางไปยังหน้าแรก
  return <Navigate to="/" replace />;
}

export default RoleBasedRoute;