import { FC, SyntheticEvent, useState } from 'react';
import { RegisterUI } from '@ui-pages';
import { useDispatch, useSelector } from '@store';
import { Navigate } from 'react-router-dom';
import { registerUser, selectUser, selectUserIsRegistering } from '@slices';
import { TUser } from '@utils-types';
import { Preloader } from '@ui';

export const Register: FC = () => {
  const dispatch = useDispatch();
  const isLoading: boolean = useSelector<boolean>(selectUserIsRegistering);
  const user: TUser | null = useSelector<TUser | null>(selectUser);

  const [userName, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();

    if (email && password) {
      dispatch(registerUser({ email, password, name: userName }));
    }
  };

  if (isLoading) {
    return <Preloader />;
  }

  if (user) {
    return <Navigate to='/' />;
  }

  return (
    <RegisterUI
      errorText=''
      email={email}
      userName={userName}
      password={password}
      setEmail={setEmail}
      setPassword={setPassword}
      setUserName={setUserName}
      handleSubmit={handleSubmit}
    />
  );
};
