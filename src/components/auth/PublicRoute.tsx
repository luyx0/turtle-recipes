import { FC, ReactNode } from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { RootState } from '../../store';

interface PublicRouteProps {
  children: ReactNode;
}

const PublicRoute: FC<PublicRouteProps> = ({ children }) => {
  const { authenticated } = useSelector((state: RootState) => state.auth);

  return !authenticated ? <>{children}</> : <Navigate to="/dashboard" />;
};

export default PublicRoute;
