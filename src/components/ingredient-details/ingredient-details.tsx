import { FC } from 'react';
import { useParams } from 'react-router-dom';
import { Preloader } from '../ui/preloader';
import { IngredientDetailsUI } from '../ui/ingredient-details';
import { useSelector } from '@store';
import { selectIngredients } from '@slices';
import { TIngredient } from '@utils-types';

export const IngredientDetails: FC = () => {
  const ingredients = useSelector<TIngredient[]>(selectIngredients);
  const { id } = useParams();

  const ingredientData = ingredients.find((i) => i._id === id);

  if (!ingredientData) {
    return <Preloader />;
  }

  return <IngredientDetailsUI ingredientData={ingredientData} />;
};
