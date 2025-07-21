import { describe, test, expect } from '@jest/globals';
import { reducer, addIngredient, removeIngredient, clearOrder, moveIngredient } from './constructorSlice';

describe('Проверяем constructor reducer', () => {
  const ban = {
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
  };

  const main = {
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
  };

  const sause = {
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
  };

  const initialState = {
    constructorItems: {
      bun: null,
      ingredients: []
    },
    orderRequest: false,
    order: null
  };

  test('Добавление ингредиента', () => {
    // Сразу добавим все 3 типа ингредиентов и убедимся, что они правильно сохранились в зависимости от типа.
    let newState = reducer(initialState, addIngredient(sause));
    newState = reducer(newState, addIngredient(ban));
    newState = reducer(newState, addIngredient(main));
    
    expect(newState.constructorItems.bun).toEqual({...ban, id: newState.constructorItems.bun?.id});
    expect(newState.constructorItems.ingredients).toHaveLength(2);
    expect(newState.constructorItems.ingredients[0]).toEqual({...sause, id: newState.constructorItems.ingredients[0].id});
    expect(newState.constructorItems.ingredients[1]).toEqual({...main, id: newState.constructorItems.ingredients[1].id});
  });

  test('Удаление ингредиента', () => {
    // Добавим 3 ингредиента и убедимся, что удалился только 1 ингредиент с заданным id.
    let newState = reducer(initialState, addIngredient(sause));
    newState = reducer(newState, addIngredient(main));
    newState = reducer(newState, addIngredient(main));

    expect(newState.constructorItems.ingredients).toHaveLength(3);

    const id = newState.constructorItems.ingredients[2].id;
    newState = reducer(newState, removeIngredient(id));

    expect(newState.constructorItems.ingredients).toHaveLength(2);
    expect(newState.constructorItems.ingredients[0].id).not.toBe(id);
    expect(newState.constructorItems.ingredients[1].id).not.toBe(id);
  });

  test('Изменение порядка ингредиентов', () => {
    let newState = reducer(initialState, addIngredient(main));
    newState = reducer(newState, addIngredient(sause));
    newState = reducer(newState, addIngredient(main));

    expect(newState.constructorItems.ingredients).toHaveLength(3);

    const id = newState.constructorItems.ingredients[2].id;

    newState = reducer(newState, moveIngredient({ index: 2, direction: -1 }));
    expect(newState.constructorItems.ingredients[1].id).toBe(id);

    newState = reducer(newState, moveIngredient({ index: 0, direction: 1 }));
    expect(newState.constructorItems.ingredients[0].id).toBe(id);
  });
});