import { FC, SyntheticEvent, useState } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { LoginUI } from '@ui-pages';
import { useDispatch, useSelector } from '@store';
import { loginUser, selectUser, selectUserIsLogging } from '@slices';
import { TUser } from '@utils-types';
import { Preloader } from '@ui';

export const Login: FC = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const isLoading: boolean = useSelector<boolean>(selectUserIsLogging);
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
    return <Navigate to={location.state?.location?.pathname || '/'} />;
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
