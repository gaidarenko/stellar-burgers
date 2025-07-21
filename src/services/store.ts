import { configureStore, combineSlices } from '@reduxjs/toolkit';
import { ingredientSlice } from './slices/ingredientSlice';
import { orderSlice } from './slices/orderSlice';
import { constructorSlice } from './slices/constructorSlice';
import { userSlice } from './slices/userSlice';

import {
  TypedUseSelectorHook,
  useDispatch as dispatchHook,
  useSelector as selectorHook
} from 'react-redux';

export const rootReducer = combineSlices(
  ingredientSlice,
  orderSlice,
  constructorSlice,
  userSlice
);

const store = configureStore({
  reducer: rootReducer,
  devTools: process.env.NODE_ENV !== 'production'
});

export type RootState = ReturnType<typeof rootReducer>;

export type AppDispatch = typeof store.dispatch;

export const useDispatch: () => AppDispatch = () => dispatchHook();
export const useSelector: TypedUseSelectorHook<RootState> = selectorHook;

export default store;
