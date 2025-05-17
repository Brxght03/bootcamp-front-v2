import { RouteObject } from 'react-router-dom';
import React from 'react';
import RoleBasedRoute from '../core/guards/RoleBasedRoute';
import AdminDashboardPage from '../pages/AdminDashboardPage';
import EventApprovalRequestsPage from '../pages/EventApprovalRequestsPage';

// Placeholder components สำหรับหน้าที่ยังไม่ได้สร้าง

const UserPermissionsPage = () => <div>User Permissions Page - coming soon</div>;
const UserSuspensionPage = () => <div>User Suspension Page - coming soon</div>;
const PopularActivitiesAdminPage = () => <div>Popular Activities Admin Page - coming soon</div>;
const TopParticipantsAdminPage = () => <div>Top Participants Admin Page - coming soon</div>;

/**
 * Admin-specific routes
 */
const adminRoutes: RouteObject[] = [
  // หน้าแดชบอร์ดแอดมินหลัก (กำหนดใน index.tsx แล้ว)
  {
    path: '/admin',
    element: (
      <RoleBasedRoute allowedRoles={['admin']}>
        <AdminDashboardPage />
      </RoleBasedRoute>
    ),
  },
  // หน้าจัดการคำขออนุมัติกิจกรรม
  {
    path: '/admin/event-approval',
    element: (
      <RoleBasedRoute allowedRoles={['admin']}>
        <EventApprovalRequestsPage />
      </RoleBasedRoute>
    ),
  },
 
  // หน้าจัดการสิทธิ์ผู้ใช้
  {
    path: '/admin/user-permissions',
    element: (
      <RoleBasedRoute allowedRoles={['admin']}>
        <UserPermissionsPage />
      </RoleBasedRoute>
    ),
  },
  // หน้าระงับบัญชีผู้ใช้
  {
    path: '/admin/user-suspension',
    element: (
      <RoleBasedRoute allowedRoles={['admin']}>
        <UserSuspensionPage />
      </RoleBasedRoute>
    ),
  },
  // หน้ากิจกรรมยอดนิยม (สำหรับ admin)
  {
    path: '/admin/popular-activities',
    element: (
      <RoleBasedRoute allowedRoles={['admin']}>
        <PopularActivitiesAdminPage />
      </RoleBasedRoute>
    ),
  },
  // หน้าผู้เข้าร่วมกิจกรรมมากที่สุด (สำหรับ admin)
  {
    path: '/admin/top-participants',
    element: (
      <RoleBasedRoute allowedRoles={['admin']}>
        <TopParticipantsAdminPage />
      </RoleBasedRoute>
    ),
  },
];

export default adminRoutes;