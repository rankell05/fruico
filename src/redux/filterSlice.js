import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  category: 'all',
  searchQuery: '',
  sortBy: 'featured', // 'featured' | 'price-asc' | 'price-desc' | 'rating' | 'name'
  maxPrice: 3000,     // DZD
  packaging: 'all',   // 'all' | '500g' | '1kg'
  origin: 'all',      // 'all' | 'dz' | 'import'
  onlyOrganic: false,
  onlyDiscounted: false,
  onlyInStock: false
};

const filterSlice = createSlice({
  name: 'filters',
  initialState,
  reducers: {
    setCategory: (state, action) => {
      state.category = action.payload;
    },
    setSearchQuery: (state, action) => {
      state.searchQuery = action.payload;
    },
    setSortBy: (state, action) => {
      state.sortBy = action.payload;
    },
    setMaxPrice: (state, action) => {
      state.maxPrice = action.payload;
    },
    setPackaging: (state, action) => {
      state.packaging = action.payload;
    },
    setOrigin: (state, action) => {
      state.origin = action.payload;
    },
    toggleOrganic: (state) => {
      state.onlyOrganic = !state.onlyOrganic;
    },
    toggleDiscounted: (state) => {
      state.onlyDiscounted = !state.onlyDiscounted;
    },
    toggleInStock: (state) => {
      state.onlyInStock = !state.onlyInStock;
    },
    resetFilters: (state) => {
      state.category = 'all';
      state.searchQuery = '';
      state.sortBy = 'featured';
      state.maxPrice = 3000;
      state.packaging = 'all';
      state.origin = 'all';
      state.onlyOrganic = false;
      state.onlyDiscounted = false;
      state.onlyInStock = false;
    }
  }
});

export const {
  setCategory,
  setSearchQuery,
  setSortBy,
  setMaxPrice,
  setPackaging,
  setOrigin,
  toggleOrganic,
  toggleDiscounted,
  toggleInStock,
  resetFilters
} = filterSlice.actions;

export default filterSlice.reducer;
