import React, { FC, useEffect } from 'react';
import './App.css';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from './store';
import {
  getUserById,
  setLoading,
  setNeedVerification,
} from './store/actions/authActions';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './firebase/config';
import Loader from './components/UI/Loader';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Header from './components/sections/Header';
import PublicRoute from './components/auth/PublicRoute';
import PrivateRoute from './components/auth/PrivateRoute';
import Homepage from './components/pages/Homepage';
import SignUp from './components/pages/SighUp';
import SignIn from './components/pages/SIgnIn';
import ForgotPassword from './components/pages/ForgorPassword';
import Dashboard from './components/pages/Dashboard';

const App: FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { loading } = useSelector((state: RootState) => state.auth);

  // Check if a user exists
  useEffect(() => {
    dispatch(setLoading(true));
    const unsubscribe = onAuthStateChanged(auth, async user => {
      if (user) {
        dispatch(setLoading(true));
        await dispatch(getUserById(user.uid));
        if (!user.emailVerified) dispatch(setNeedVerification());
      }
      dispatch(setLoading(false));
    });

    return () => unsubscribe();
  }, [dispatch]);

  if (loading) return <Loader />;

  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route
          path="/"
          element={
            <PublicRoute>
              <Homepage />
            </PublicRoute>
          }
        />
        <Route
          path="/signup"
          element={
            <PublicRoute>
              <SignUp />
            </PublicRoute>
          }
        />
        <Route
          path="/signin"
          element={
            <PublicRoute>
              <SignIn />
            </PublicRoute>
          }
        />
        <Route
          path="/forgot-password"
          element={
            <PublicRoute>
              <ForgotPassword />
            </PublicRoute>
          }
        />
        <Route
          path="/dashboard"
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
