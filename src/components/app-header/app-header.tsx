import { FC } from 'react';
import { AppHeaderUI } from '@ui';
import { useSelector } from '@store';
import { TUser } from '@utils-types';
import { selectUser } from '@slices';

export const AppHeader: FC = () => {
  const user: TUser | null = useSelector<TUser | null>(selectUser);

  return <AppHeaderUI userName={user ? user.name : ''} />;
};
