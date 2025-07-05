import { FC, SyntheticEvent, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { LoginUI } from '@ui-pages';
import { useDispatch, useSelector } from '@store';
import { loginUser, selectUser, selectUserIsLoading } from '@slices';
import { TUser } from '@utils-types';
import { Preloader } from '@ui';

export const Login: FC = () => {
  const dispatch = useDispatch();
  const isLoading: boolean = useSelector<boolean>(selectUserIsLoading);
  const user: TUser | null = useSelector<TUser | null>(selectUser);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();

    if (email && password) {
      dispatch(loginUser({ email, password }));
    }
  };

  if (isLoading) {
    return <Preloader />;
  }

  if (user) {
    return <Navigate to='/' />;
  }

  return (
    <LoginUI
      errorText=''
      email={email}
      setEmail={setEmail}
      password={password}
      setPassword={setPassword}
      handleSubmit={handleSubmit}
    />
  );
};
