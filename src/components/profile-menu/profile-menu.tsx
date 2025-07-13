import { FC } from 'react';
import { useLocation } from 'react-router-dom';
import { ProfileMenuUI } from '@ui';
import { useDispatch, useSelector } from '@store';
import { Navigate } from 'react-router-dom';
import { logoutUser, selectUser, selectUserIsLogging } from '@slices';
import { TUser } from '@utils-types';
import { Preloader } from '@ui';

export const ProfileMenu: FC = () => {
  const dispatch = useDispatch();
  const isLoading: boolean = useSelector<boolean>(selectUserIsLogging);
  const user: TUser | null = useSelector<TUser | null>(selectUser);
  const { pathname } = useLocation();

  const handleLogout = () => {
    dispatch(logoutUser());
  };

  if (isLoading) {
    return <Preloader />;
  }

  if (!user) {
    return <Navigate to='/login' />;
  }

  return <ProfileMenuUI handleLogout={handleLogout} pathname={pathname} />;
};
