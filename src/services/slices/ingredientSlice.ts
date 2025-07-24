import { TIngredient } from '@utils-types';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getIngredientsApi } from '@api';

type TIngredientsState = {
  data: Array<TIngredient>;
  isLoading: boolean;
};

const initialState: TIngredientsState = {
  data: [],
  isLoading: false
};

export const fetchIngredients = createAsyncThunk(
  'ingredients/getAll',
  async () => getIngredientsApi()
);

export const ingredientSlice = createSlice({
  name: 'ingredient',
  initialState,
  reducers: {},
  selectors: {
    selectIngredients: (state) => state.data,
    selectIsLoading: (state) => state.isLoading
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchIngredients.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchIngredients.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(fetchIngredients.fulfilled, (state, action) => {
        state.isLoading = false;
        state.data = action.payload;
      });
  }
});

export const { selectIngredients, selectIsLoading } = ingredientSlice.selectors;
