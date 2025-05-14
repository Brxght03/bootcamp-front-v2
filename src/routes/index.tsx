import { RouteObject } from 'react-router-dom';
import React from 'react';
import LoginPage from '../pages/LoginPage';

const HomePage = React.lazy(() => import('../pages/HomePage'));
const NotFoundPage = React.lazy(() => import('../pages/NotFound404.page'));

const routes: RouteObject[] = [
  {
    path: '/',
    element: <HomePage />,
  },
  {
    path: '/login',
    element: <LoginPage />,
  },
  {
    path: '*',
    element: <NotFoundPage />,
  },
];

export default routes;