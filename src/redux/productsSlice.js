import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { apiGetAllProducts, apiGetProductDetails } from '../services/apiService';

// Async action to fetch all backend products
export const fetchAllProducts = createAsyncThunk('products/fetchAllProducts', async () => {
  const response = await apiGetAllProducts();
  return response.products;
});

// Async action to fetch specific product details
export const fetchProductDetails = createAsyncThunk(
  'products/fetchProductDetails',
  async (productId) => {
    const response = await apiGetProductDetails(productId);
    return response;
  }
);

const productsSlice = createSlice({
  name: 'products',
  initialState: {
    allProducts: [],
    filteredProducts: [],
    categories: [],
    selectedProduct: null,
    loading: false,
    error: null,
  },

  reducers: {
    filterBySearch: (state, action) => {
      state.filteredProducts = state.allProducts.filter((product) =>
        product.title.toLowerCase().includes(action.payload.toLowerCase())
      );
    },
    sortByName: (state, action) => {
      const direction = action.payload; // 'asc' or 'desc' comes as a prop
      state.filteredProducts.sort((a, b) =>
        direction === 'asc' ? a.title.localeCompare(b.title) : b.title.localeCompare(a.title)
      );
    },
    sortByPrice: (state, action) => {
      const direction = action.payload; // 'asc' or 'desc' comes as a prop
      state.filteredProducts.sort((a, b) =>
        direction === 'asc' ? a.price - b.price : b.price - a.price
      );
    },
    filterByRating: (state, action) => {
      state.filteredProducts = state.allProducts.filter(
        (product) => product.rating >= action.payload
      );
    },
    filterByCategory: (state, action) => {
      state.filteredProducts = state.allProducts.filter(
        (product) => product.category === action.payload
      );
    },
  },

  // Functions to handle async actions from createAsyncThunk
  extraReducers: (builder) => {
    builder
      // Fetch all products
      .addCase(fetchAllProducts.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchAllProducts.fulfilled, (state, action) => {
        state.allProducts = action.payload;
        state.filteredProducts = action.payload;
        state.categories = [...new Set(action.payload.map((product) => product.category))];
        state.loading = false;
      })
      .addCase(fetchAllProducts.rejected, (state, action) => {
        state.error = action.error.message;
        state.loading = false;
      })
      // Fetch product details
      .addCase(fetchProductDetails.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchProductDetails.fulfilled, (state, action) => {
        state.selectedProduct = action.payload;
        state.loading = false;
      })
      .addCase(fetchProductDetails.rejected, (state, action) => {
        state.error = action.error.message;
        state.loading = false;
      });
  },
});

export const { filterBySearch, sortByName, sortByPrice, filterByRating, filterByCategory } =
  productsSlice.actions;
export default productsSlice.reducer;
