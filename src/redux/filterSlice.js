import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  category: 'all',
  searchQuery: '',
  sortBy: 'featured', // 'featured' | 'price-asc' | 'price-desc' | 'rating' | 'name'
  maxPrice: 2000,     // DZD
  onlyOrganic: false,
  onlyDiscounted: false
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
    toggleOrganic: (state) => {
      state.onlyOrganic = !state.onlyOrganic;
    },
    toggleDiscounted: (state) => {
      state.onlyDiscounted = !state.onlyDiscounted;
    },
    resetFilters: (state) => {
      state.category = 'all';
      state.searchQuery = '';
      state.sortBy = 'featured';
      state.maxPrice = 2000;
      state.onlyOrganic = false;
      state.onlyDiscounted = false;
    }
  }
});

export const {
  setCategory,
  setSearchQuery,
  setSortBy,
  setMaxPrice,
  toggleOrganic,
  toggleDiscounted,
  resetFilters
} = filterSlice.actions;

export default filterSlice.reducer;
