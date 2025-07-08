import { FC, useMemo, useEffect } from 'react';
import { Preloader } from '../ui/preloader';
import { OrderInfoUI } from '../ui/order-info';
import { TIngredient, TOrder } from '@utils-types';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from '@store';
import {
  selectIngredients,
  selectOrders,
  getOrderByNumber,
  fetchIngredients
} from '@slices';

export const OrderInfo: FC = () => {
  const { number } = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchIngredients());
    if (number) {
      dispatch(getOrderByNumber(parseInt(number)));
    }
  }, []);

  const orders: TOrder[] = useSelector<TOrder[]>(selectOrders);

  const orderData: TOrder | undefined = orders.find(
    (o) => o.number.toString() === number
  );

  const ingredients: TIngredient[] =
    useSelector<TIngredient[]>(selectIngredients);

  /* Готовим данные для отображения */
  const orderInfo = useMemo(() => {
    if (!orderData || !ingredients.length) return null;

    const date = new Date(orderData.createdAt);

    type TIngredientsWithCount = {
      [key: string]: TIngredient & { count: number };
    };

    const ingredientsInfo = orderData.ingredients.reduce(
      (acc: TIngredientsWithCount, item) => {
        if (!acc[item]) {
          const ingredient = ingredients.find((ing) => ing._id === item);
          if (ingredient) {
            acc[item] = {
              ...ingredient,
              count: 1
            };
          }
        } else {
          acc[item].count++;
        }

        return acc;
      },
      {}
    );

    const total = Object.values(ingredientsInfo).reduce(
      (acc, item) => acc + item.price * item.count,
      0
    );

    return {
      ...orderData,
      ingredientsInfo,
      date,
      total
    };
  }, [orderData, ingredients]);

  if (!orderInfo) {
    return <Preloader />;
  }

  return <OrderInfoUI orderInfo={orderInfo} />;
};
