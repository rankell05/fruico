import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { 
  Snowflake, 
  ShoppingCart, 
  Heart, 
  Sun, 
  Moon, 
  Search, 
  X, 
  Menu,
  Phone,
  Truck,
  ShieldCheck,
  ChevronDown,
  Layers,
  Sparkles,
  Tag
} from 'lucide-react';
import { toggleTheme } from '../redux/themeSlice';
import { setSearchQuery, setCategory, toggleDiscounted } from '../redux/filterSlice';
import { CATEGORIES } from '../data/products';

export default function Navbar({ onOpenCart, onOpenFavorites }) {
  const dispatch = useDispatch();
  const darkMode = useSelector(state => state.theme.darkMode);
  const cartItems = useSelector(state => state.cart.items);
  const favoriteIds = useSelector(state => state.favorites.items);
  const { searchQuery, category, onlyDiscounted } = useSelector(state => state.filters);

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [selectedCatInSearch, setSelectedCatInSearch] = useState('all');

  const totalCartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);
  const totalCartPrice = cartItems.reduce((acc, item) => acc + (item.price * item.quantity), 0);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (selectedCatInSearch !== 'all') {
      dispatch(setCategory(selectedCatInSearch));
    }
  };

  const handleClearSearch = () => {
    dispatch(setSearchQuery(''));
  };

  return (
    <header className="site-header">
      {/* 1. TOP UTILITY BAR (E-COMMERCE SERVICE & INFO) */}
      <div className="top-utility-bar">
        <div className="container utility-flex">
          <div className="utility-left">
            <div className="utility-item">
              <Phone size={13} className="text-accent" />
              <span>Service Client : <strong>0550 12 34 56</strong> (8h - 19h)</span>
            </div>
            <div className="utility-item hide-mobile">
              <Truck size={13} className="text-accent" />
              <span>Livraison frigorifique <strong>58 Wilayas</strong></span>
            </div>
            <div className="utility-item hide-tablet">
              <Snowflake size={13} className="text-cyan" />
              <span>Chaîne du froid <strong>-18°C garantie</strong></span>
            </div>
          </div>

          <div className="utility-right">
            <div className="utility-item hide-mobile">
              <ShieldCheck size={13} className="text-emerald" />
              <span>Paiement en espèces à la livraison (COD)</span>
            </div>
            <div className="utility-currency-pill">
              <span>🇩🇿 DZD (Dinar Algérien)</span>
            </div>
          </div>
        </div>
      </div>

      {/* 2. MAIN HEADER BAR (LOGO, SEARCH, ACCOUNT, CART) */}
      <div className="main-header-bar">
        <div className="container header-flex">
          {/* Logo Fruico */}
          <a 
            href="#" 
            className="brand-logo" 
            onClick={() => { dispatch(setCategory('all')); dispatch(setSearchQuery('')); }}
          >
            <div className="logo-badge">
              <Snowflake size={24} className="logo-frost" />
            </div>
            <div className="logo-text">
              <span className="brand-title">FRUICO<span className="brand-accent">.DZ</span></span>
              <span className="brand-subtitle">Marché des Fruits Surgelés</span>
            </div>
          </a>

          {/* E-Commerce Search Bar with Category Dropdown */}
          <form className="ecommerce-search-form" onSubmit={handleSearchSubmit}>
            <div className="search-category-select-wrapper hide-mobile">
              <select 
                value={selectedCatInSearch}
                onChange={(e) => {
                  setSelectedCatInSearch(e.target.value);
                  dispatch(setCategory(e.target.value));
                }}
                className="search-category-select"
              >
                <option value="all">Tous les rayons</option>
                <option value="fruits-rouges">Fruits Rouges</option>
                <option value="tropicaux">Fruits Exotiques</option>
                <option value="verger-algerien">Verger Algérien</option>
                <option value="smoothies-mix">Smoothies & Mix</option>
              </select>
              <ChevronDown size={14} className="select-arrow-icon" />
            </div>

            <div className="search-input-field-wrapper">
              <input
                type="text"
                placeholder="Rechercher fraises, mangue, myrtilles, cerises, mix..."
                value={searchQuery}
                onChange={(e) => dispatch(setSearchQuery(e.target.value))}
                className="ecommerce-search-input"
              />
              {searchQuery && (
                <button 
                  type="button" 
                  onClick={handleClearSearch} 
                  className="search-clear-btn"
                  title="Effacer"
                >
                  <X size={15} />
                </button>
              )}
            </div>

            <button type="submit" className="ecommerce-search-btn" title="Lancer la recherche">
              <Search size={18} />
              <span className="hide-mobile">Rechercher</span>
            </button>
          </form>

          {/* Right Action Icons (Dark mode, Favorites, Cart) */}
          <div className="header-actions-group">
            {/* Theme Toggle Button */}
            <button
              onClick={() => dispatch(toggleTheme())}
              className="header-icon-btn"
              title={darkMode ? "Passer au mode clair" : "Passer au mode sombre"}
              aria-label="Mode sombre/clair"
            >
              {darkMode ? <Sun size={20} className="text-amber" /> : <Moon size={20} />}
            </button>

            {/* Wishlist Button */}
            <button
              onClick={onOpenFavorites}
              className="header-icon-btn"
              title="Mes fruits favoris"
              aria-label="Favoris"
            >
              <Heart size={21} className={favoriteIds.length > 0 ? "fill-red text-red" : ""} />
              {favoriteIds.length > 0 && (
                <span className="icon-badge badge-fav">{favoriteIds.length}</span>
              )}
            </button>

            {/* Cart Button (E-Commerce style) */}
            <button
              onClick={onOpenCart}
              className="ecommerce-cart-btn"
              title="Consulter mon panier"
              aria-label="Panier d'achats"
            >
              <div className="cart-icon-container">
                <ShoppingCart size={22} />
                {totalCartCount > 0 && (
                  <span className="icon-badge badge-cart-count">{totalCartCount}</span>
                )}
              </div>
              <div className="cart-info-text hide-mobile">
                <span className="cart-small-label">Mon Panier</span>
                <span className="cart-amount-label">
                  {totalCartPrice.toLocaleString()} <small>DZD</small>
                </span>
              </div>
            </button>

            {/* Mobile menu hamburger */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="header-icon-btn hide-desktop"
              aria-label="Menu"
            >
              {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>
      </div>

      {/* 3. CATEGORIES NAVIGATION BAR (RAYONS DU SUPERMARCHÉ) */}
      <div className="categories-navbar hide-mobile">
        <div className="container nav-links-flex">
          <div className="rayons-dropdown-btn" onClick={() => dispatch(setCategory('all'))}>
            <Layers size={17} />
            <span>Tous nos Rayons ({CATEGORIES[0].count})</span>
          </div>

          <div className="horizontal-rayons-list">
            <button 
              className={`rayon-link ${category === 'fruits-rouges' ? 'active' : ''}`}
              onClick={() => dispatch(setCategory('fruits-rouges'))}
            >
              🍓 Fruits Rouges & Baies
            </button>
            <button 
              className={`rayon-link ${category === 'tropicaux' ? 'active' : ''}`}
              onClick={() => dispatch(setCategory('tropicaux'))}
            >
              🥭 Fruits Exotiques & Tropicaux
            </button>
            <button 
              className={`rayon-link ${category === 'verger-algerien' ? 'active' : ''}`}
              onClick={() => dispatch(setCategory('verger-algerien'))}
            >
              🍑 Verger Algérien (Fraises, Pêches, Cerises)
            </button>
            <button 
              className={`rayon-link ${category === 'smoothies-mix' ? 'active' : ''}`}
              onClick={() => dispatch(setCategory('smoothies-mix'))}
            >
              🥤 Mix & Smoothies
            </button>
            <button 
              className={`rayon-link promo-link ${onlyDiscounted ? 'active' : ''}`}
              onClick={() => dispatch(toggleDiscounted())}
            >
              <Tag size={14} />
              <span>Promotions & Ventes Flash</span>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="mobile-dropdown-menu">
          <div className="container mobile-dropdown-content">
            <div className="mobile-categories-list">
              <span className="mobile-cat-header">Rayons de Surgelés :</span>
              {CATEGORIES.map(cat => (
                <button
                  key={cat.id}
                  className={`mobile-cat-item ${category === cat.id ? 'active' : ''}`}
                  onClick={() => {
                    dispatch(setCategory(cat.id));
                    setMobileMenuOpen(false);
                  }}
                >
                  <span>{cat.label}</span>
                  <span className="cat-count-badge">{cat.count}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
