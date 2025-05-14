import { Navigate } from 'react-router-dom';
import { JSX } from 'react';
import { useAuth } from '../../hooks/UseAuth.hook';

interface ProtectedRouteProps {
  children: JSX.Element;
}

function ProtectedRoute({ children }: ProtectedRouteProps) {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return children;
}

export default ProtectedRoute;