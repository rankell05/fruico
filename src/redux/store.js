import { configureStore } from '@reduxjs/toolkit';
import cartReducer from './cartSlice';
import favoritesReducer from './favoritesSlice';
import filterReducer from './filterSlice';
import themeReducer from './themeSlice';

/**
 * REDUX STORE DE L'APPLICATION FRUICO
 * Module: WAMD - TP 2: React Application with Redux for State Management
 * 
 * Le store centralise l'état global de l'application:
 * - cart: gestion des articles ajoutés, quantités, codes promos, calculs en DZD
 * - favorites: liste des IDs des fruits coup de cœur mis en favoris
 * - filters: recherche par texte, catégorie active, tri (prix, note), filtres bio/promo
 * - theme: gestion du mode sombre (dark mode) / clair (light mode)
 */
export const store = configureStore({
  reducer: {
    cart: cartReducer,
    favorites: favoritesReducer,
    filters: filterReducer,
    theme: themeReducer
  }
});

export default store;
