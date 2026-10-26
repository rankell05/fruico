import { createSlice } from '@reduxjs/toolkit';

// Chargement initial depuis le localStorage (si disponible)
const loadCartFromStorage = () => {
  try {
    const saved = localStorage.getItem('fruico_cart');
    return saved ? JSON.parse(saved) : [];
  } catch (e) {
    console.error('Erreur de lecture du panier:', e);
    return [];
  }
};

const initialState = {
  items: loadCartFromStorage(),
  promoCode: '',
  discountPercent: 0,
  promoError: ''
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    // Action: Ajouter un produit au panier
    addToCart: (state, action) => {
      const { product, quantity = 1 } = action.payload;
      const existingItem = state.items.find(item => item.id === product.id);

      if (existingItem) {
        existingItem.quantity += quantity;
      } else {
        state.items.push({
          id: product.id,
          name: product.name,
          price: product.price,
          oldPrice: product.oldPrice,
          weight: product.weight,
          image: product.image,
          categoryName: product.categoryName,
          origin: product.origin,
          quantity: quantity
        });
      }
      try {
        localStorage.setItem('fruico_cart', JSON.stringify(state.items));
      } catch (e) {
        /* ignore */
      }
    },

    // Action: Supprimer un produit du panier
    removeFromCart: (state, action) => {
      const productId = action.payload;
      state.items = state.items.filter(item => item.id !== productId);
      try {
        localStorage.setItem('fruico_cart', JSON.stringify(state.items));
      } catch (e) {
        /* ignore */
      }
    },

    // Action: Mettre à jour la quantité d'un produit (+ / -)
    updateQuantity: (state, action) => {
      const { id, quantity } = action.payload;
      const item = state.items.find(item => item.id === id);
      if (item) {
        if (quantity <= 0) {
          state.items = state.items.filter(item => item.id !== id);
        } else {
          item.quantity = quantity;
        }
      }
      try {
        localStorage.setItem('fruico_cart', JSON.stringify(state.items));
      } catch (e) {
        /* ignore */
      }
    },

    // Action: Vider entièrement le panier
    clearCart: (state) => {
      state.items = [];
      state.promoCode = '';
      state.discountPercent = 0;
      state.promoError = '';
      try {
        localStorage.removeItem('fruico_cart');
      } catch (e) {
        /* ignore */
      }
    },

    // Action: Appliquer un code promo algérien (ex: ENSTA2026, FROST10)
    applyPromoCode: (state, action) => {
      const code = action.payload.trim().toUpperCase();
      if (code === 'ENSTA2026') {
        state.promoCode = code;
        state.discountPercent = 15; // -15% pour les étudiants ENSTA
        state.promoError = '';
      } else if (code === 'FRUICO10') {
        state.promoCode = code;
        state.discountPercent = 10;
        state.promoError = '';
      } else {
        state.promoError = 'Code promo invalide. Essayez "ENSTA2026" ou "FRUICO10"';
      }
    },

    removePromoCode: (state) => {
      state.promoCode = '';
      state.discountPercent = 0;
      state.promoError = '';
    }
  }
});

export const {
  addToCart,
  removeFromCart,
  updateQuantity,
  clearCart,
  applyPromoCode,
  removePromoCode
} = cartSlice.actions;

export default cartSlice.reducer;
