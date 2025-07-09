import { useSelector, useDispatch } from '@store';
import { fetchIngredients, selectIsLoading } from '@slices';
import styles from './constructor-page.module.css';
import { BurgerIngredients, BurgerConstructor } from '@components';
import { Preloader } from '@ui';
import { FC, useEffect } from 'react';

export const ConstructorPage: FC = () => {
  const isIngredientsLoading = useSelector<boolean>(selectIsLoading);

  return (
    <>
      {isIngredientsLoading ? (
        <Preloader />
      ) : (
        <main className={styles.containerMain}>
          <h1
            className={`${styles.title} text text_type_main-large mt-10 mb-5 pl-5`}
          >
            Соберите бургер
          </h1>
          <div className={`${styles.main} pl-5 pr-5`}>
            <BurgerIngredients />
            <BurgerConstructor />
          </div>
        </main>
      )}
    </>
  );
};
