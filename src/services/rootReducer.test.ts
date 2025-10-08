import { describe, test, expect } from '@jest/globals';
import { rootReducer } from './store';

describe('Проверяем rootReducer', () => {
  test('Правильно настроен', () => {
    const expectedState = {
      ingredient: { 
        data: [],
        isLoading: false
      },
      order: {
        userOrders: [],
        feeds: [],
        orders: [],
        isLoading: false,
        total: 0,
        totalToday: 0
      },
      burgerConstructor: {
        constructorItems: {
          bun: null,
          ingredients: []
        },
        orderRequest: false,
        order: null
      },
      user: {
        user: null,
        isLoading: false,
        isLogging: false,
        isUpdating: false,
        isRegistering: false
      }
    };

    expect(rootReducer(undefined, { type: 'UNKNOWN_ACTION'})).toEqual(expectedState);
  });

});