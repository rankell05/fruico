import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { 
  Snowflake, 
  ShoppingBag, 
  Heart, 
  Sun, 
  Moon, 
  Search, 
  X, 
  Menu,
  ShieldCheck,
  Truck
} from 'lucide-react';
import { toggleTheme } from '../redux/themeSlice';
import { setSearchQuery, setCategory } from '../redux/filterSlice';

export default function Navbar({ onOpenCart, onOpenFavorites }) {
  const dispatch = useDispatch();
  const darkMode = useSelector(state => state.theme.darkMode);
  const cartItems = useSelector(state => state.cart.items);
  const favoriteIds = useSelector(state => state.favorites.items);
  const searchQuery = useSelector(state => state.filters.searchQuery);

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Calcul du total des articles et du montant total dans le panier
  const totalCartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);
  const totalCartPrice = cartItems.reduce((acc, item) => acc + (item.price * item.quantity), 0);

  const handleSearchChange = (e) => {
    dispatch(setSearchQuery(e.target.value));
  };

  const handleClearSearch = () => {
    dispatch(setSearchQuery(''));
  };

  return (
    <header className="navbar-wrapper">
      {/* Barre supérieure d'informations de livraison algérienne */}
      <div className="top-announcement-bar">
        <div className="container announcement-content">
          <div className="announcement-item">
            <Snowflake size={14} className="pulse-icon text-cyan" />
            <span>Chaîne du froid <strong>-18°C garantie</strong> avec caissons isothermes</span>
          </div>
          <div className="announcement-item hide-mobile">
            <Truck size={14} />
            <span>Livraison express <strong>58 Wilayas</strong> | Gratuite dès 5 000 DZD</span>
          </div>
          <div className="announcement-item hide-tablet">
            <ShieldCheck size={14} />
            <span>Paiement en espèces à la livraison (COD)</span>
          </div>
        </div>
      </div>

      {/* Barre de navigation principale */}
      <nav className="main-nav">
        <div className="container nav-container">
          {/* Logo Fruico */}
          <a href="#" className="brand-logo" onClick={() => { dispatch(setCategory('all')); dispatch(setSearchQuery('')); }}>
            <div className="logo-icon-wrapper">
              <Snowflake className="logo-frost-icon" size={26} />
              <span className="logo-sparkle">✨</span>
            </div>
            <div className="logo-text-wrapper">
              <span className="brand-name">FRUICO<span className="brand-dot">.dz</span></span>
              <span className="brand-tagline">Fruits Surgelés -18°C</span>
            </div>
          </a>

          {/* Barre de recherche intégrée (connectée au Redux store) */}
          <div className="search-bar-container">
            <div className="search-input-wrapper">
              <Search size={18} className="search-icon" />
              <input
                type="text"
                placeholder="Rechercher fraises, mangue, myrtilles, mix..."
                value={searchQuery}
                onChange={handleSearchChange}
                className="search-input"
              />
              {searchQuery && (
                <button 
                  onClick={handleClearSearch}
                  className="search-clear-btn"
                  title="Effacer la recherche"
                >
                  <X size={16} />
                </button>
              )}
            </div>
          </div>

          {/* Actions utilisateur: Thème, Favoris, Panier */}
          <div className="nav-actions">
            {/* Toggle Dark / Light mode */}
            <button
              onClick={() => dispatch(toggleTheme())}
              className="action-btn theme-btn"
              title={darkMode ? "Passer au mode clair" : "Passer au mode sombre"}
              aria-label="Basculer le thème"
            >
              {darkMode ? <Sun size={20} className="text-amber" /> : <Moon size={20} className="text-indigo" />}
            </button>

            {/* Bouton Favoris (Wishlist) */}
            <button
              onClick={onOpenFavorites}
              className="action-btn favorites-btn"
              title="Voir mes fruits favoris"
              aria-label="Favoris"
            >
              <Heart size={20} className={favoriteIds.length > 0 ? "fill-red text-red" : ""} />
              {favoriteIds.length > 0 && (
                <span className="badge-count badge-favorites">{favoriteIds.length}</span>
              )}
            </button>

            {/* Bouton Panier avec compteur dynamique et montant en DZD */}
            <button
              onClick={onOpenCart}
              className="action-btn cart-btn"
              title="Ouvrir le panier"
              aria-label="Panier d'achat"
            >
              <div className="cart-icon-box">
                <ShoppingBag size={20} />
                {totalCartCount > 0 && (
                  <span className="badge-count badge-cart pulse-badge">{totalCartCount}</span>
                )}
              </div>
              <div className="cart-total-text hide-mobile">
                <span className="cart-label">Mon Panier</span>
                <span className="cart-price-preview">{totalCartPrice.toLocaleString()} DZD</span>
              </div>
            </button>

            {/* Bouton Menu Mobile */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="action-btn menu-toggle-btn hide-desktop"
              aria-label="Menu"
            >
              {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>

        {/* Menu mobile déroulant */}
        {mobileMenuOpen && (
          <div className="mobile-menu-drawer">
            <div className="container mobile-menu-inner">
              <div className="mobile-search">
                <Search size={16} />
                <input
                  type="text"
                  placeholder="Rechercher un fruit..."
                  value={searchQuery}
                  onChange={handleSearchChange}
                />
              </div>
              <div className="mobile-links">
                <a href="#catalogue" onClick={() => setMobileMenuOpen(false)}>🍓 Tous les fruits</a>
                <a href="#engagements" onClick={() => setMobileMenuOpen(false)}>❄️ Chaîne du froid -18°C</a>
                <a href="#livraison" onClick={() => setMobileMenuOpen(false)}>🚚 Livraison 58 Wilayas</a>
              </div>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}
