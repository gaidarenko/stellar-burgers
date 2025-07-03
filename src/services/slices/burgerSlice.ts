import {
  TIngredient,
  TConstructorIngredient,
  TConstructorItems
} from '@utils-types';
import { createSlice, nanoid, PayloadAction } from '@reduxjs/toolkit';

type TBurgerState = {
  constructorItems: TConstructorItems;
};

const initialState: TBurgerState = {
  constructorItems: {
    bun: null,
    ingredients: []
  }
};

export const burgerSlice = createSlice({
  name: 'burger',
  initialState,
  reducers: {
    addIngredient: {
      reducer: (state, action: PayloadAction<TConstructorIngredient>) => {
        if (action.payload.type === 'bun') {
          state.constructorItems.bun = action.payload;
        } else {
          state.constructorItems.ingredients.push(action.payload);
        }
      },
      prepare: (ingredient: TIngredient) => {
        const id = nanoid();
        return { payload: { ...ingredient, id } };
      }
    },
    removeIngredient: (state, action: PayloadAction<string>) => {
      state.constructorItems.ingredients =
        state.constructorItems.ingredients.filter(
          (i) => i.id !== action.payload
        );
    }
  },
  selectors: {
    selectConstructorItems: (state) => state.constructorItems
  }
});

export const { addIngredient, removeIngredient } = burgerSlice.actions;
export const { selectConstructorItems } = burgerSlice.selectors;
