import { configureStore } from '@reduxjs/toolkit';
import productsReducer from './productsSlice';

// Creating the global redux store
export const store = configureStore({
  reducer: {
    // products slice
    products: productsReducer,
  },
});
