import { ProfileOrdersUI } from '@ui-pages';
import { TOrder } from '@utils-types';
import { FC, useEffect } from 'react';
import { useSelector, useDispatch } from '@store';
import { fetchOrders, selectUserOrders } from '@slices';

export const ProfileOrders: FC = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchOrders());
  }, []);

  const orders: TOrder[] = useSelector<TOrder[]>(selectUserOrders);

  return <ProfileOrdersUI orders={orders} />;
};
