import { FC, ReactNode } from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { RootState } from '../../store';

interface PrivateRouteProps {
  children: ReactNode;
}

const PrivateRoute: FC<PrivateRouteProps> = ({ children }) => {
  const { authenticated } = useSelector((state: RootState) => state.auth);

  return authenticated ? <>{children}</> : <Navigate to="/signin" />;
};

export default PrivateRoute;
