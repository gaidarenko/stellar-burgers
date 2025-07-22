import { describe, test, expect } from '@jest/globals';
import { reducer, fetchIngredients } from './ingredientSlice';

describe('Проверяем ingredient reducer', () => {

  const mockIngredients = [
    {
      _id: "643d69a5c3f7b9001cfa093c",
      name: "Краторная булка N-200i",
      type: "bun",
      proteins: 80,
      fat: 24,
      carbohydrates: 53,
      calories: 420,
      price: 1255,
      image: "https://code.s3.yandex.net/react/code/bun-02.png",
      image_mobile: "https://code.s3.yandex.net/react/code/bun-02-mobile.png",
      image_large: "https://code.s3.yandex.net/react/code/bun-02-large.png",
    },
    {
      _id: "643d69a5c3f7b9001cfa0941",
      name: "Биокотлета из марсианской Магнолии",
      type: "main",
      proteins: 420,
      fat: 142,
      carbohydrates: 242,
      calories: 4242,
      price: 424,
      image: "https://code.s3.yandex.net/react/code/meat-01.png",
      image_mobile: "https://code.s3.yandex.net/react/code/meat-01-mobile.png",
      image_large: "https://code.s3.yandex.net/react/code/meat-01-large.png",
    },
    {
      _id: "643d69a5c3f7b9001cfa0942",
      name: "Соус Spicy-X",
      type: "sauce",
      proteins: 30,
      fat: 20,
      carbohydrates: 40,
      calories: 30,
      price: 90,
      image: "https://code.s3.yandex.net/react/code/sauce-02.png",
      image_mobile: "https://code.s3.yandex.net/react/code/sauce-02-mobile.png",
      image_large: "https://code.s3.yandex.net/react/code/sauce-02-large.png",
    }
  ];

  test('fetchIngredients.pending', () => {
    const initialState = {
      data: [],
      isLoading: false
    };

    const action = fetchIngredients.pending('requestId'); 
    const newState = reducer(initialState, action);

    expect(newState.isLoading).toBe(true);
    expect(newState.data).toHaveLength(0);
  });

  test('fetchIngredients.rejected', () => {
    const initialState = {
      data: [],
      isLoading: true
    };

    const action = fetchIngredients.rejected(null, 'requestId'); 
    const newState = reducer(initialState, action);

    expect(newState.isLoading).toBe(false);
    expect(newState.data).toHaveLength(0);
  });

  test('fetchIngredients.fulfilled', () => {
    const initialState = {
      data: [],
      isLoading: true
    };

    const action = fetchIngredients.fulfilled(mockIngredients, 'requestId'); 
    const newState = reducer(initialState, action);

    expect(newState.isLoading).toBe(false);
    expect(newState.data).toEqual(mockIngredients);
  });
});