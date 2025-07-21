import {
  AnyAction,
  configureStore,
  Reducer,
  ThunkDispatch,
  UnknownAction,
} from '@reduxjs/toolkit';
import authReducer from './reducers/authReducer';
import { AuthAction, AuthState } from './types';

const authReducerWrapper: Reducer<AuthState, UnknownAction, AuthState> = (
  state = {} as AuthState,
  action,
) => {
  if (action.type === 'auth') {
    return authReducer(state, action as AuthAction);
  }
  return state;
};

const store = configureStore({
  reducer: {
    auth: authReducerWrapper,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = ThunkDispatch<RootState, null, AuthAction>;

export default store;
