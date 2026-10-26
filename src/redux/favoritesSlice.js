import { createSlice } from '@reduxjs/toolkit';

const loadFavoritesFromStorage = () => {
  try {
    const saved = localStorage.getItem('fruico_favorites');
    return saved ? JSON.parse(saved) : [];
  } catch (e) {
    return [];
  }
};

const favoritesSlice = createSlice({
  name: 'favorites',
  initialState: {
    items: loadFavoritesFromStorage()
  },
  reducers: {
    toggleFavorite: (state, action) => {
      const productId = action.payload;
      const index = state.items.indexOf(productId);
      if (index >= 0) {
        state.items.splice(index, 1);
      } else {
        state.items.push(productId);
      }
      try {
        localStorage.setItem('fruico_favorites', JSON.stringify(state.items));
      } catch (e) {
        /* ignore */
      }
    },
    clearFavorites: (state) => {
      state.items = [];
      try {
        localStorage.removeItem('fruico_favorites');
      } catch (e) {
        /* ignore */
      }
    }
  }
});

export const { toggleFavorite, clearFavorites } = favoritesSlice.actions;
export default favoritesSlice.reducer;
