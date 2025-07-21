import { FC, ComponentType } from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { RootState } from '../../store';

interface Props {
  component: ComponentType<any>;
}

const PublicRoute: FC<Props> = ({ component: Component }) => {
  const { authenticated } = useSelector((state: RootState) => state.auth);

  return authenticated ? <Component /> : <Navigate to="/dashboard" />;
};

export default PublicRoute;
