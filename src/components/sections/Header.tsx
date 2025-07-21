import { FC } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { AppDispatch, RootState } from '../../store';
import { signout } from '../../store/actions/authActions';
import Button from '../UI/Button';

const Header: FC = () => {
  const history = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const { authenticated } = useSelector((state: RootState) => state.auth);

  const logoutClickHandler = () => {
    dispatch(signout());
  };

  return (
    <nav className="navbar is-spased has-shadow">
      <div className="container">
        <div className="navbar-brand">
          <Link className="navbar-item" to={authenticated ? '/' : '/dashboard'}>
            TurtleRecipes
          </Link>
        </div>
        <div className="navbar-end">
          <div className="navbar-items">
            {!authenticated ? (
              <div className="buttons">
                <Button
                  text="Sign Up"
                  onClick={() => history('/signup')}
                  className="is-primary"
                ></Button>
                <Button
                  text="Sign in"
                  onClick={() => history('/signin')}
                ></Button>
              </div>
            ) : (
              <Button text="Logout" onClick={logoutClickHandler} />
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Header;
