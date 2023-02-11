import { configureStore } from '@reduxjs/toolkit';
import item from './itemSlice';

export const store = configureStore({
  reducer: { item },
});
