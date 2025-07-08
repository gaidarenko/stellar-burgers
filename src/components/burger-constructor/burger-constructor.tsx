import { FC, useMemo } from 'react';
import {
  TConstructorIngredient,
  TConstructorItems,
  TOrder
} from '@utils-types';
import { BurgerConstructorUI } from '@ui';
import { useSelector, useDispatch } from '@store';
import {
  selectConstructorItems,
  selectOrderRequest,
  selectOrder,
  orderBurger,
  clearOrder,
  selectUser
} from '@slices';
import { useNavigate } from 'react-router-dom';

export const BurgerConstructor: FC = () => {
  const navigate = useNavigate();
  const user = useSelector(selectUser);
  const dispatch = useDispatch();

  const constructorItems: TConstructorItems = useSelector<TConstructorItems>(
    selectConstructorItems
  );
  const orderRequest: boolean = useSelector<boolean>(selectOrderRequest);
  const orderModalData: TOrder | null = useSelector<TOrder | null>(selectOrder);

  const onOrderClick = () => {
    if (!constructorItems.bun || orderRequest) return;

    if (!user) {
      navigate('/login');
    } else {
      const ingredients = constructorItems.ingredients.map((i) => i._id);
      ingredients.push(constructorItems.bun._id);
      dispatch(orderBurger(ingredients));
    }
  };
  const closeOrderModal = () => {
    dispatch(clearOrder());
  };

  const price = useMemo(
    () =>
      (constructorItems.bun ? constructorItems.bun.price * 2 : 0) +
      constructorItems.ingredients.reduce(
        (s: number, v: TConstructorIngredient) => s + v.price,
        0
      ),
    [constructorItems]
  );

  return (
    <BurgerConstructorUI
      price={price}
      orderRequest={orderRequest}
      constructorItems={constructorItems}
      orderModalData={orderModalData}
      onOrderClick={onOrderClick}
      closeOrderModal={closeOrderModal}
    />
  );
};
