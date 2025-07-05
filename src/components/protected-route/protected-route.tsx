import { Navigate, Outlet } from 'react-router-dom';
import { selectUser } from '@slices';
import { useSelector } from '@store';
import { TUser } from '@utils-types';

export const ProtectedRoute = () => {
  const user: TUser | null = useSelector<TUser | null>(selectUser);

  if (!user) {
    return <Navigate to='/login' replace />;
  }

  return <Outlet />;
};
