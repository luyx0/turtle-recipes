import { FC, use, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../store';
import { setSuccess } from '../../store/actions/authActions';
import Message from '../UI/Message';

const Dashboard: FC = () => {
  const { user, needVerification, success } = useSelector(
    (state: RootState) => state.auth,
  );
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    if (success) {
      dispatch(setSuccess(''));
    }
  }, [success, dispatch]);

  return (
    <section className="section">
      <div className="container">
        {needVerification && (
          <Message type="success" msg="Please verify your email address." />
        )}
        <h1 className="is-size-1">Welcome {user?.firstName}</h1>
      </div>
    </section>
  );
};

export default Dashboard;
