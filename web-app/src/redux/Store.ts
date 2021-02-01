import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import productReducer from './ProductSlice';

export const store = configureStore({
  reducer: { products: productReducer },
  devTools: process.env.NODE_ENV === 'development',
});

export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, Action<string>>;
