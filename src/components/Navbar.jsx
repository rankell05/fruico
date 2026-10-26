import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { 
  ShoppingCart, 
  Heart, 
  Search, 
  X, 
  Menu,
  Phone,
  Truck,
  Snowflake,
  ChevronDown,
  Layers,
  Tag
} from 'lucide-react';
import Logo from './Logo';
import { setSearchQuery, setCategory, toggleDiscounted } from '../redux/filterSlice';
import { CATEGORIES } from '../data/products';

export default function Navbar({ onOpenCart, onOpenFavorites }) {
  const dispatch = useDispatch();
  const cartItems = useSelector(state => state.cart.items);
  const favoriteIds = useSelector(state => state.favorites.items);
  const { searchQuery, category, onlyDiscounted } = useSelector(state => state.filters);

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileSearchOpen, setMobileSearchOpen] = useState(false);
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
      {/* 1. TOP UTILITY BAR (NAVY #091540) */}
      <div className="top-utility-bar">
        <div className="container utility-flex">
          <div className="utility-left">
            <div className="utility-item">
              <Phone size={13} className="text-ice" />
              <span>Service Client : <strong>0123 45 67 89</strong></span>
            </div>
            <div className="utility-item hide-mobile">
              <Truck size={13} className="text-frost" />
              <span>Livraison frigorifique <strong>58 Wilayas</strong></span>
            </div>
            <div className="utility-item hide-tablet">
              <Snowflake size={13} className="text-ice" />
              <span>Chaîne du froid <strong>-18°C certifiée</strong></span>
            </div>
          </div>

          <div className="utility-right">
            <div className="utility-currency-pill">
              <span>🇩🇿 DZD (Dinar Algérien)</span>
            </div>
          </div>
        </div>
      </div>

      {/* 2. MAIN HEADER (LOGO, SEARCH, ACTIONS) */}
      <div className="main-header-bar">
        <div className="container header-flex">
          {/* Logo Officiel Fruico */}
          <a 
            href="#" 
            className="brand-logo-link" 
            onClick={() => { dispatch(setCategory('all')); dispatch(setSearchQuery('')); }}
            aria-label="Accueil Fruico"
          >
            <Logo />
          </a>

          {/* Desktop Search Bar */}
          <form className="desktop-search-form hide-mobile" onSubmit={handleSearchSubmit}>
            <div className="search-category-dropdown">
              <select 
                value={selectedCatInSearch}
                onChange={(e) => {
                  setSelectedCatInSearch(e.target.value);
                  dispatch(setCategory(e.target.value));
                }}
                className="search-cat-select"
              >
                <option value="all">Tous les rayons</option>
                <option value="fruits-rouges">Fruits Rouges</option>
                <option value="tropicaux">Fruits Exotiques</option>
                <option value="verger-algerien">Verger Algérien</option>
                <option value="smoothies-mix">Smoothies & Mix</option>
              </select>
              <ChevronDown size={14} className="cat-arrow" />
            </div>

            <div className="search-input-box">
              <input
                type="text"
                placeholder="Rechercher fraises, mangue, myrtilles, cerises, mix..."
                value={searchQuery}
                onChange={(e) => dispatch(setSearchQuery(e.target.value))}
                className="search-input"
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

            <button type="submit" className="search-submit-btn" aria-label="Rechercher">
              <Search size={18} />
              <span>Rechercher</span>
            </button>
          </form>

          {/* Actions : Recherche Mobile, Favoris, Panier, Menu */}
          <div className="header-actions-flex">
            {/* Mobile search toggle */}
            <button
              onClick={() => setMobileSearchOpen(!mobileSearchOpen)}
              className="action-icon-btn hide-desktop"
              aria-label="Recherche"
              title="Rechercher"
            >
              {mobileSearchOpen ? <X size={20} /> : <Search size={20} />}
            </button>

            {/* Favoris (Wishlist) */}
            <button
              onClick={onOpenFavorites}
              className="action-icon-btn"
              title="Mes fruits favoris"
              aria-label="Favoris"
            >
              <Heart size={21} className={favoriteIds.length > 0 ? "fill-royal text-royal" : ""} />
              {favoriteIds.length > 0 && (
                <span className="badge-count badge-fav">{favoriteIds.length}</span>
              )}
            </button>

            {/* Bouton Panier E-Commerce */}
            <button
              onClick={onOpenCart}
              className="cart-pill-btn"
              title="Consulter mon panier"
              aria-label="Panier d'achats"
            >
              <div className="cart-icon-box">
                <ShoppingCart size={20} />
                {totalCartCount > 0 && (
                  <span className="badge-count badge-cart">{totalCartCount}</span>
                )}
              </div>
              <div className="cart-pill-text hide-mobile">
                <span className="cart-pill-label">Mon Panier</span>
                <span className="cart-pill-total">
                  {totalCartPrice.toLocaleString()} <small>DZD</small>
                </span>
              </div>
            </button>

            {/* Bouton Menu Mobile (Hamburger) */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="action-icon-btn hide-desktop"
              aria-label="Menu des rayons"
            >
              {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>

        {/* Mobile Search Input Drawer (Visible when tapped on mobile) */}
        {mobileSearchOpen && (
          <div className="mobile-search-expand hide-desktop">
            <div className="container">
              <div className="mobile-search-box">
                <Search size={17} className="text-muted" />
                <input
                  type="text"
                  placeholder="Rechercher un fruit (ex: fraises, mangue...)"
                  value={searchQuery}
                  onChange={(e) => dispatch(setSearchQuery(e.target.value))}
                  autoFocus
                />
                {searchQuery && (
                  <button onClick={handleClearSearch} className="mobile-clear-btn">
                    <X size={16} />
                  </button>
                )}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* 3. HORIZONTAL CATEGORIES BAR (SWIPEABLE TOUCH SCROLL) */}
      <nav className="rayons-navbar">
        <div className="container rayons-flex">
          <button 
            className={`rayon-tab all-rayons-tab ${category === 'all' && !onlyDiscounted ? 'active' : ''}`}
            onClick={() => dispatch(setCategory('all'))}
          >
            <Layers size={16} />
            <span>Tous les Rayons</span>
          </button>

          <div className="swipeable-rayons-track">
            <button 
              className={`rayon-tab ${category === 'fruits-rouges' ? 'active' : ''}`}
              onClick={() => dispatch(setCategory('fruits-rouges'))}
            >
              🍓 Fruits Rouges
            </button>
            <button 
              className={`rayon-tab ${category === 'tropicaux' ? 'active' : ''}`}
              onClick={() => dispatch(setCategory('tropicaux'))}
            >
              🥭 Fruits Exotiques
            </button>
            <button 
              className={`rayon-tab ${category === 'verger-algerien' ? 'active' : ''}`}
              onClick={() => dispatch(setCategory('verger-algerien'))}
            >
              🍑 Verger Algérien
            </button>
            <button 
              className={`rayon-tab ${category === 'smoothies-mix' ? 'active' : ''}`}
              onClick={() => dispatch(setCategory('smoothies-mix'))}
            >
              🥤 Mix & Smoothies
            </button>
            <button 
              className={`rayon-tab promo-tab ${onlyDiscounted ? 'active' : ''}`}
              onClick={() => dispatch(toggleDiscounted())}
            >
              <Tag size={14} />
              <span>Promotions</span>
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="mobile-nav-drawer hide-desktop">
          <div className="container mobile-nav-content">
            <div className="mobile-rayons-header">Rayons de Surgelés :</div>
            <div className="mobile-rayons-grid">
              {CATEGORIES.map(cat => (
                <button
                  key={cat.id}
                  className={`mobile-rayon-item ${category === cat.id ? 'active' : ''}`}
                  onClick={() => {
                    dispatch(setCategory(cat.id));
                    setMobileMenuOpen(false);
                  }}
                >
                  <span>{cat.label}</span>
                  <span className="mobile-cat-badge">{cat.count}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
