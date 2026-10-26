import { createSlice } from '@reduxjs/toolkit';

const getInitialTheme = () => {
  try {
    const saved = localStorage.getItem('fruico_theme');
    if (saved) return saved === 'dark';
    return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
  } catch (e) {
    return false;
  }
};

const themeSlice = createSlice({
  name: 'theme',
  initialState: {
    darkMode: getInitialTheme()
  },
  reducers: {
    toggleTheme: (state) => {
      state.darkMode = !state.darkMode;
      try {
        localStorage.setItem('fruico_theme', state.darkMode ? 'dark' : 'light');
      } catch (e) {
        /* ignore */
      }
    },
    setTheme: (state, action) => {
      state.darkMode = action.payload;
      try {
        localStorage.setItem('fruico_theme', state.darkMode ? 'dark' : 'light');
      } catch (e) {
        /* ignore */
      }
    }
  }
});

export const { toggleTheme, setTheme } = themeSlice.actions;
export default themeSlice.reducer;
