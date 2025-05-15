import { RouteObject } from 'react-router-dom';
import React from 'react';
import LoginPage from '../pages/LoginPage';
import RegisterPage from '../pages/RegisterPage';
import RoleBasedRoute from '../core/guards/RoleBasedRoute';

const HomePage = React.lazy(() => import('../pages/HomePage'));
const NotFoundPage = React.lazy(() => import('../pages/NotFound404.page'));

// หน้าเหล่านี้จะถูกสร้างในอนาคต (สร้างไว้เป็นตัวอย่าง)
const AdminDashboard = React.lazy(() => import('../pages/HomePage')); // Placeholder
const StaffDashboard = React.lazy(() => import('../pages/HomePage')); // Placeholder

/**
 * กำหนดเส้นทางทั้งหมดในแอปพลิเคชัน
 * รวมถึงการป้องกันเส้นทางตามบทบาทผู้ใช้
 */
const routes: RouteObject[] = [
  // หน้าหลักที่ทุกคนเข้าถึงได้
  {
    path: '/',
    element: <HomePage />,
  },
  // หน้าล็อกอิน
  {
    path: '/login',
    element: <LoginPage />,
  },
  // หน้าสมัครสมาชิก
  {
    path: '/register',
    element: <RegisterPage />,
  },
  // แดชบอร์ดแอดมิน - เข้าถึงได้เฉพาะแอดมิน
  {
    path: '/admin',
    element: (
      <RoleBasedRoute allowedRoles={['admin']}>
        <AdminDashboard />
      </RoleBasedRoute>
    ),
  },
  // แดชบอร์ดเจ้าหน้าที่ - เข้าถึงได้เฉพาะเจ้าหน้าที่และแอดมิน
  {
    path: '/staff-dashboard',
    element: (
      <RoleBasedRoute allowedRoles={['staff', 'admin']}>
        <StaffDashboard />
      </RoleBasedRoute>
    ),
  },
  // หน้า 404 สำหรับเส้นทางที่ไม่มีอยู่
  {
    path: '*',
    element: <NotFoundPage />,
  },
];

export default routes;