import { ProfileUI } from '@ui-pages';
import { FC, SyntheticEvent, useEffect, useState } from 'react';
import { useSelector, useDispatch } from '@store';
import { TUser } from '@utils-types';
import {
  fetchUser,
  updateUser,
  selectUser,
  selectUserIsUpdating
} from '@slices';
import { Preloader } from '@ui';
import { Navigate } from 'react-router-dom';
import { TRegisterData } from '@api';

export const Profile: FC = () => {
  const user: TUser | null = useSelector<TUser | null>(selectUser);
  const isUpdating: boolean = useSelector<boolean>(selectUserIsUpdating);
  const dispatch = useDispatch();

  const [formValue, setFormValue] = useState({
    name: user?.name || '',
    email: user?.email || '',
    password: ''
  });

  useEffect(() => {
    setFormValue((prevState) => ({
      ...prevState,
      name: user?.name || '',
      email: user?.email || ''
    }));
  }, [user]);

  const isFormChanged =
    formValue.name !== user?.name ||
    formValue.email !== user?.email ||
    !!formValue.password;

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    const newUser: Partial<TRegisterData> = {};

    if (formValue.name !== user?.name) {
      newUser.name = formValue.name;
    }

    if (formValue.email !== user?.email) {
      newUser.email = formValue.email;
    }

    if (formValue.password) {
      newUser.password = formValue.password;
    }

    dispatch(updateUser(newUser));
  };

  const handleCancel = (e: SyntheticEvent) => {
    e.preventDefault();
    setFormValue({
      name: user?.name || '',
      email: user?.email || '',
      password: ''
    });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormValue((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value
    }));
  };

  if (isUpdating) {
    return <Preloader />;
  }

  if (!user) {
    return <Navigate to='/' />;
  }

  return (
    <ProfileUI
      formValue={formValue}
      isFormChanged={isFormChanged}
      handleCancel={handleCancel}
      handleSubmit={handleSubmit}
      handleInputChange={handleInputChange}
    />
  );
};
