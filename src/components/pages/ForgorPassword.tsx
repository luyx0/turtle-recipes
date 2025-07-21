import { FC, FormEvent, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { AppDispatch, RootState } from '../../store';
import {
  setError,
  setPasswordReset,
  setSuccess,
} from '../../store/actions/authActions';
import Message from '../UI/Message';
import Input from '../UI/input';
import Button from '../UI/Button';

const ForgotPassword: FC = () => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch<AppDispatch>();
  const { error, success } = useSelector((state: RootState) => state.auth);

  useEffect(() => {
    return () => {
      if (error) {
        dispatch(setError(''));
      }
      if (success) {
        dispatch(setSuccess(''));
      }
    };
  }, [error, dispatch]);

  const submitHandler = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    await dispatch(
      setPasswordReset(
        email,
        'Email sent successfully! Please check your email',
      ),
    );
  };

  return (
    <section className="section">
      <div className="container">
        <h2 className="has-text-centered is-size-2 mb-3">Reset password</h2>
        <form className="form" onSubmit={submitHandler}>
          {success && <Message type="success" msg={success} />}
          <Input
            name="email"
            value={email}
            onChange={e => setEmail(e.currentTarget.value)}
            placeholder="Email address"
            label="Email address"
          />

          <Button
            text={loading ? 'Loading...' : 'Send password reset email'}
            className="is-primary is-fullwidth mt-5"
            disabled={loading}
          />
        </form>
      </div>
    </section>
  );
};

export default ForgotPassword;
