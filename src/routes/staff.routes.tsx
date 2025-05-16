// This file is a placeholder for staff-specific routes which would be implemented later.

import React from 'react';
import { RouteObject } from 'react-router-dom';
import StaffDashboardPage from '../pages/StaffDashboardPage';
import RoleBasedRoute from '../core/guards/RoleBasedRoute';

// Placeholder component for the Activities page
const StaffActivitiesPage = () => <div>Staff Activities Page - coming soon</div>;

// Placeholder component for the Approval Requests page
const ApprovalRequestsPage = () => <div>Approval Requests Page - coming soon</div>;

/**
 * Staff-specific routes
 */
const staffRoutes: RouteObject[] = [
  // หน้าแดชบอร์ดเจ้าหน้าที่หลัก (กำหนดใน index.tsx แล้ว)
  {
    path: '/staff-dashboard',
    element: (
      <RoleBasedRoute allowedRoles={['staff']}>
        <StaffDashboardPage />
      </RoleBasedRoute>
    ),
  },
  // หน้ารายการกิจกรรมของเจ้าหน้าที่
  {
    path: '/staff/activities',
    element: (
      <RoleBasedRoute allowedRoles={['staff']}>
        <StaffActivitiesPage />
      </RoleBasedRoute>
    ),
  },
  // หน้าคำขออนุมัติเข้าร่วมกิจกรรม
  {
    path: '/staff/approval-requests',
    element: (
      <RoleBasedRoute allowedRoles={['staff']}>
        <ApprovalRequestsPage />
      </RoleBasedRoute>
    ),
  },
];

export default staffRoutes;