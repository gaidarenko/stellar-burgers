import {
  TIngredient,
  TConstructorIngredient,
  TConstructorItems,
  TOrder
} from '@utils-types';
import {
  createSlice,
  createAsyncThunk,
  nanoid,
  PayloadAction
} from '@reduxjs/toolkit';
import { orderBurgerApi } from '@api';

type TConstructorState = {
  constructorItems: TConstructorItems;
  orderRequest: boolean;
  order: TOrder | null;
};

const initialState: TConstructorState = {
  constructorItems: {
    bun: null,
    ingredients: []
  },
  orderRequest: false,
  order: null
};

export const orderBurger = createAsyncThunk(
  'burger/order',
  async (data: string[]) => orderBurgerApi(data)
);

export const constructorSlice = createSlice({
  name: 'burgerConstructor',
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
    },
    clearOrder: (state) => {
      state.order = null;
    }
  },
  selectors: {
    selectConstructorItems: (state) => state.constructorItems,
    selectOrderRequest: (state) => state.orderRequest,
    selectOrder: (state) => state.order
  },
  extraReducers: (builder) => {
    builder
      .addCase(orderBurger.pending, (state) => {
        state.orderRequest = true;
      })
      .addCase(orderBurger.rejected, (state) => {
        state.orderRequest = false;
      })
      .addCase(orderBurger.fulfilled, (state, action) => {
        state.orderRequest = false;
        state.order = action.payload.order;
        state.constructorItems.bun = null;
        state.constructorItems.ingredients = [];
      });
  }
});

export const { addIngredient, removeIngredient, clearOrder } =
  constructorSlice.actions;
export const { selectConstructorItems, selectOrderRequest, selectOrder } =
  constructorSlice.selectors;
