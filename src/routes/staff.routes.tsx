import { RouteObject } from 'react-router-dom';
import React from 'react';
import RoleBasedRoute from '../core/guards/RoleBasedRoute';
import StaffDashboardPage from '../pages/StaffDashboardPage';
import CreateEventPage from '../pages/CreateEventPage';
import StaffActivitiesPage from '../pages/StaffActivitiesPage';
import EditEventPage from '../pages/EditEventPage';
import ActivityParticipantsPage from '../pages/ActivityParticipantsPage';

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
  // หน้าสร้างกิจกรรมใหม่
  {
    path: '/create-event',
    element: (
      <RoleBasedRoute allowedRoles={['staff']}>
        <CreateEventPage />
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
  // หน้าแก้ไขกิจกรรม
  {
    path: '/edit-event/:id',
    element: (
      <RoleBasedRoute allowedRoles={['staff']}>
        <EditEventPage />
      </RoleBasedRoute>
    ),
  },
  // หน้าแสดงรายชื่อผู้เข้าร่วมกิจกรรม
  {
    path: '/staff/activity-participants/:id',
    element: (
      <RoleBasedRoute allowedRoles={['staff']}>
        <ActivityParticipantsPage />
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
  // หน้ากิจกรรมยอดนิยม
  {
    path: '/staff/popular-activities',
    element: (
      <RoleBasedRoute allowedRoles={['staff']}>
        <div>Popular Activities Page - coming soon</div>
      </RoleBasedRoute>
    ),
  },
  // หน้าผู้เข้าร่วมกิจกรรมมากที่สุด
  {
    path: '/staff/top-participants',
    element: (
      <RoleBasedRoute allowedRoles={['staff']}>
        <div>Top Participants Page - coming soon</div>
      </RoleBasedRoute>
    ),
  },
];

export default staffRoutes;