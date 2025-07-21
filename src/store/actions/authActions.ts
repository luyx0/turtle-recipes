import { ThunkAction } from 'redux-thunk';
import {
  AuthAction,
  NEED_VERIFICATION,
  SET_ERROR,
  SET_LOADING,
  SET_SUCCESS,
  SET_USER,
  SIGN_OUT,
  SignInData,
  SignUpData,
  User,
} from '../types';
import { RootState } from '..';
import firebase, { auth, firestore } from '../../firebase/config';
import 'firebase/firestore';
import {
  createUserWithEmailAndPassword,
  getAuth,
  sendEmailVerification,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
} from 'firebase/auth';
import { doc, getDoc, setDoc } from 'firebase/firestore';

export const signup = (
  data: SignUpData,
  onError: () => void,
): ThunkAction<void, RootState, null, AuthAction> => {
  return async dispatch => {
    try {
      const response = await createUserWithEmailAndPassword(
        auth,
        data.email,
        data.password,
      );
      if (response.user) {
        const userData: User = {
          firstName: data.firstName,
          email: data.email,
          id: response.user.uid,
          createdAt: Date.now(),
        };

        await setDoc(doc(firestore, 'users', response.user.uid), userData);
        await sendEmailVerification(response.user);

        dispatch({
          type: NEED_VERIFICATION,
        });

        dispatch({
          type: SET_USER,
          payload: userData,
        });
      }
    } catch (e) {
      onError();
      dispatch(setError((e as Error).message));
    }
  };
};

// Get user by id
export const getUserById = (
  id: string,
): ThunkAction<void, RootState, null, AuthAction> => {
  return async dispatch => {
    try {
      const userRef = doc(firestore, 'users', id);
      const user = await getDoc(userRef);
      if (user.exists()) {
        const userData = user.data() as User;
        dispatch({
          type: SET_USER,
          payload: userData,
        });
      }
    } catch (e) {
      dispatch(setError((e as Error).message));
    }
  };
};

// Set loading
export const setLoading = (
  value: boolean,
): ThunkAction<void, RootState, null, AuthAction> => {
  return dispatch => {
    dispatch({
      type: SET_LOADING,
      payload: value,
    });
  };
};

// Log in
export const signin = (
  data: SignInData,
  onError: () => void,
): ThunkAction<void, RootState, null, AuthAction> => {
  return async dispatch => {
    try {
      await signInWithEmailAndPassword(auth, data.email, data.password);
    } catch (e) {
      onError();
      dispatch(setError((e as Error).message));
    }
  };
};

// Log out
export const signout = (): ThunkAction<void, RootState, null, AuthAction> => {
  return async dispatch => {
    try {
      dispatch(setLoading(true));
      await auth.signOut();
      dispatch({
        type: SIGN_OUT,
      });
    } catch (e) {
      dispatch(setError((e as Error).message));
    }
  };
};

// Set needest verification
export const setNeedVerification = (): ThunkAction<
  void,
  RootState,
  null,
  AuthAction
> => {
  return dispatch => {
    dispatch({
      type: NEED_VERIFICATION,
    });
  };
};

// Set success
export const setSuccess = (
  value: string,
): ThunkAction<void, RootState, null, AuthAction> => {
  return dispatch => {
    dispatch({
      type: SET_SUCCESS,
      payload: value,
    });
  };
};

// Set password reset
export const setPasswordReset = (
  email: string,
  successMsg: string,
): ThunkAction<void, RootState, null, AuthAction> => {
  return dispatch => {
    try {
      sendPasswordResetEmail(auth, email);
      dispatch(setSuccess(successMsg));
    } catch (e) {
      dispatch(setError((e as Error).message));
    }
  };
};

// Set erorr
export const setError = (
  value: string,
): ThunkAction<void, RootState, null, AuthAction> => {
  return dispatch => {
    dispatch({
      type: SET_ERROR,
      payload: value,
    });
  };
};
