import { Navigate, useLocation } from 'react-router-dom';
import { selectUser, selectUserIsLoading, fetchUser } from '@slices';
import { useSelector, useDispatch } from '@store';
import { TUser } from '@utils-types';
import { Preloader } from '@ui';
import { useEffect } from 'react';
import { only } from 'node:test';

type TProtectedRoute = {
  children: React.ReactNode;
  onlyUnAuth?: boolean;
};

export const ProtectedRoute = ({ children, onlyUnAuth }: TProtectedRoute) => {
  const dispatch = useDispatch();
  const location = useLocation();

  useEffect(() => {
    dispatch(fetchUser());
  }, []);

  const user: TUser | null = useSelector<TUser | null>(selectUser);
  const isLoading: boolean = useSelector<boolean>(selectUserIsLoading);

  if (isLoading) {
    return <Preloader />;
  }

  if (!onlyUnAuth && !user) {
    return <Navigate to='/login' replace state={{ location }} />;
  }

  if (onlyUnAuth && user) {
    return <Navigate to='/' replace />;
  }

  return children;
};
