import React, { useState, useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { PRODUCTS, CATEGORIES, PACKAGING_OPTIONS, ORIGIN_OPTIONS } from '../data/products';
import ProductCard from './ProductCard';
import { 
  setCategory, 
  setPackaging, 
  setOrigin, 
  setMaxPrice, 
  setSortBy, 
  toggleOrganic, 
  toggleDiscounted, 
  toggleInStock, 
  resetFilters,
  setSearchQuery
} from '../redux/filterSlice';
import { 
  Filter, 
  ArrowUpDown, 
  RotateCcw, 
  X, 
  SlidersHorizontal,
  Frown,
  Check
} from 'lucide-react';

export default function ProductCatalog({ onQuickView, onNotify }) {
  const dispatch = useDispatch();
  const { 
    category, 
    searchQuery, 
    sortBy, 
    maxPrice, 
    packaging, 
    origin, 
    onlyOrganic, 
    onlyDiscounted, 
    onlyInStock 
  } = useSelector(state => state.filters);

  // État local pour le tiroir de filtres sur mobile/tablette
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);

  // Filtrage des produits selon tous les critères
  const filteredProducts = useMemo(() => {
    return PRODUCTS.filter(item => {
      if (category !== 'all' && item.category !== category) return false;

      if (searchQuery.trim() !== '') {
        const q = searchQuery.toLowerCase().trim();
        const matchesName = item.name.toLowerCase().includes(q);
        const matchesCategory = item.categoryName.toLowerCase().includes(q);
        const matchesOrigin = item.origin.toLowerCase().includes(q);
        const matchesDesc = item.description.toLowerCase().includes(q);
        if (!matchesName && !matchesCategory && !matchesOrigin && !matchesDesc) return false;
      }

      if (item.price > maxPrice) return false;
      if (packaging !== 'all' && item.packaging !== packaging) return false;
      if (origin === 'dz' && !item.isAlgerian) return false;
      if (origin === 'import' && item.isAlgerian) return false;
      if (onlyOrganic && !item.isOrganic) return false;
      if (onlyDiscounted && item.discountPercent <= 0) return false;
      if (onlyInStock && !item.inStock) return false;

      return true;
    }).sort((a, b) => {
      if (sortBy === 'price-asc') return a.price - b.price;
      if (sortBy === 'price-desc') return b.price - a.price;
      if (sortBy === 'rating') return b.rating - a.rating;
      if (sortBy === 'name') return a.name.localeCompare(b.name);
      return 0;
    });
  }, [category, searchQuery, sortBy, maxPrice, packaging, origin, onlyOrganic, onlyDiscounted, onlyInStock]);

  const activeCategoryObj = CATEGORIES.find(c => c.id === category) || CATEGORIES[0];

  const activeFiltersCount = 
    (category !== 'all' ? 1 : 0) + 
    (packaging !== 'all' ? 1 : 0) + 
    (origin !== 'all' ? 1 : 0) + 
    (maxPrice < 3000 ? 1 : 0) + 
    (onlyOrganic ? 1 : 0) + 
    (onlyDiscounted ? 1 : 0) + 
    (onlyInStock ? 1 : 0) +
    (searchQuery ? 1 : 0);

  // Composant contenu des filtres (réutilisé pour Desktop et tiroir Mobile)
  const FilterContent = () => (
    <>
      <div className="sidebar-filter-header">
        <div className="sidebar-header-left">
          <SlidersHorizontal size={18} className="text-royal" />
          <h3 className="sidebar-heading-text">Filtres du Marché</h3>
        </div>
        {activeFiltersCount > 0 && (
          <button 
            onClick={() => dispatch(resetFilters())} 
            className="sidebar-clear-all-btn"
            title="Effacer tous les filtres"
          >
            <RotateCcw size={12} />
            <span>Effacer</span>
          </button>
        )}
      </div>

      {/* 1. Rayons */}
      <div className="filter-group-section">
        <h4 className="filter-section-title">Rayons</h4>
        <ul className="categories-list-vertical">
          {CATEGORIES.map(cat => (
            <li key={cat.id}>
              <button
                className={`category-item-btn ${category === cat.id ? 'active' : ''}`}
                onClick={() => {
                  dispatch(setCategory(cat.id));
                  if (mobileFilterOpen) setMobileFilterOpen(false);
                }}
              >
                <span className="cat-label">{cat.label}</span>
                <span className="cat-count">({cat.count})</span>
              </button>
            </li>
          ))}
        </ul>
      </div>

      {/* 2. Budget Maximum */}
      <div className="filter-group-section">
        <div className="filter-title-with-val">
          <h4 className="filter-section-title">Budget Maximum</h4>
          <span className="budget-val-badge">{maxPrice.toLocaleString()} DZD</span>
        </div>
        <input
          type="range"
          min="600"
          max="3000"
          step="50"
          value={maxPrice}
          onChange={(e) => dispatch(setMaxPrice(Number(e.target.value)))}
          className="fruico-slider"
        />
        <div className="slider-limits-row">
          <span>600 DZD</span>
          <span>3 000 DZD</span>
        </div>
      </div>

      {/* 3. Format / Conditionnement */}
      <div className="filter-group-section">
        <h4 className="filter-section-title">Format du Sachet</h4>
        <div className="filter-radios-col">
          {PACKAGING_OPTIONS.map(pkg => (
            <label key={pkg.id} className="filter-choice-label">
              <input
                type="radio"
                name="packaging"
                value={pkg.id}
                checked={packaging === pkg.id}
                onChange={() => dispatch(setPackaging(pkg.id))}
              />
              <span>{pkg.label}</span>
            </label>
          ))}
        </div>
      </div>

      {/* 4. Origine */}
      <div className="filter-group-section">
        <h4 className="filter-section-title">Provenance</h4>
        <div className="filter-radios-col">
          {ORIGIN_OPTIONS.map(orig => (
            <label key={orig.id} className="filter-choice-label">
              <input
                type="radio"
                name="origin"
                value={orig.id}
                checked={origin === orig.id}
                onChange={() => dispatch(setOrigin(orig.id))}
              />
              <span>{orig.label}</span>
            </label>
          ))}
        </div>
      </div>

      {/* 5. Critères Spéciaux */}
      <div className="filter-group-section">
        <h4 className="filter-section-title">Sélection</h4>
        <div className="filter-checkboxes-col">
          <label className="filter-choice-label">
            <input
              type="checkbox"
              checked={onlyDiscounted}
              onChange={() => dispatch(toggleDiscounted())}
            />
            <span>Promotions du mois</span>
          </label>

          <label className="filter-choice-label">
            <input
              type="checkbox"
              checked={onlyOrganic}
              onChange={() => dispatch(toggleOrganic())}
            />
            <span>100% Bio & Naturel</span>
          </label>

          <label className="filter-choice-label">
            <input
              type="checkbox"
              checked={onlyInStock}
              onChange={() => dispatch(toggleInStock())}
            />
            <span>En stock immédiat</span>
          </label>
        </div>
      </div>
    </>
  );

  return (
    <section className="catalog-main-section" id="catalogue-section">
      <div className="container">
        {/* Fil d'Ariane */}
        <div className="fruico-breadcrumb">
          <a href="#" onClick={() => dispatch(resetFilters())}>Accueil</a>
          <span className="breadcrumb-dot">/</span>
          <span>Fruits Surgelés</span>
          <span className="breadcrumb-dot">/</span>
          <span className="breadcrumb-active">{activeCategoryObj.label}</span>
          {searchQuery && (
            <>
              <span className="breadcrumb-dot">/</span>
              <span className="breadcrumb-search">« {searchQuery} »</span>
            </>
          )}
        </div>

        {/* Barre de contrôle Mobile : Bouton Filtres & Tri */}
        <div className="mobile-catalog-actions-bar hide-desktop">
          <button 
            onClick={() => setMobileFilterOpen(true)}
            className="mobile-filter-trigger-btn"
          >
            <Filter size={16} />
            <span>Filtrer les produits</span>
            {activeFiltersCount > 0 && (
              <span className="mobile-active-filter-badge">{activeFiltersCount}</span>
            )}
          </button>

          <div className="mobile-sort-select-box">
            <ArrowUpDown size={14} className="text-royal" />
            <select
              value={sortBy}
              onChange={(e) => dispatch(setSortBy(e.target.value))}
              className="mobile-sort-select"
            >
              <option value="featured">Recommandés</option>
              <option value="price-asc">Prix croissant</option>
              <option value="price-desc">Prix décroissant</option>
              <option value="rating">Mieux notés</option>
              <option value="name">Nom (A-Z)</option>
            </select>
          </div>
        </div>

        {/* Grille principale avec Sidebar Desktop */}
        <div className="catalog-columns-wrapper">
          {/* Sidebar Desktop (visible uniquement sur grand écran) */}
          <aside className="desktop-filters-sidebar hide-mobile">
            <FilterContent />
          </aside>

          {/* Tiroir Filtre Mobile (Bottom Sheet / Drawer quand actif) */}
          {mobileFilterOpen && (
            <div className="drawer-overlay" onClick={() => setMobileFilterOpen(false)}>
              <div className="mobile-filter-sheet" onClick={(e) => e.stopPropagation()}>
                <div className="mobile-sheet-header">
                  <h3>Filtres & Préférences</h3>
                  <button onClick={() => setMobileFilterOpen(false)} className="mobile-sheet-close">
                    <X size={20} />
                  </button>
                </div>
                <div className="mobile-sheet-body">
                  <FilterContent />
                </div>
                <div className="mobile-sheet-footer">
                  <button 
                    onClick={() => setMobileFilterOpen(false)}
                    className="btn-primary btn-block"
                  >
                    <span>Voir les {filteredProducts.length} fruits</span>
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Colonne Principale : Produits */}
          <main className="catalog-products-column">
            {/* Header du catalogue Desktop */}
            <div className="catalog-header-banner hide-mobile">
              <div className="header-info-area">
                <h2 className="rayon-title-text">{activeCategoryObj.label}</h2>
                <span className="rayon-count-text">
                  <strong>{filteredProducts.length}</strong> référence{filteredProducts.length > 1 ? 's' : ''} disponible{filteredProducts.length > 1 ? 's' : ''}
                </span>
              </div>

              <div className="desktop-sort-box">
                <span className="desktop-sort-label">Trier par :</span>
                <select
                  value={sortBy}
                  onChange={(e) => dispatch(setSortBy(e.target.value))}
                  className="desktop-sort-select"
                >
                  <option value="featured">Recommandations Fruico</option>
                  <option value="price-asc">Prix : Moins cher d'abord</option>
                  <option value="price-desc">Prix : Plus cher d'abord</option>
                  <option value="rating">Meilleures notes clients</option>
                  <option value="name">Ordre alphabétique (A-Z)</option>
                </select>
              </div>
            </div>

            {/* Badges des filtres actifs */}
            {activeFiltersCount > 0 && (
              <div className="active-filters-chips-row">
                <span className="chips-lead">Filtres actifs :</span>
                {category !== 'all' && (
                  <span className="filter-chip">
                    {activeCategoryObj.label}
                    <button onClick={() => dispatch(setCategory('all'))}>×</button>
                  </span>
                )}
                {searchQuery && (
                  <span className="filter-chip">
                    « {searchQuery} »
                    <button onClick={() => dispatch(setSearchQuery(''))}>×</button>
                  </span>
                )}
                {packaging !== 'all' && (
                  <span className="filter-chip">
                    Format: {packaging}
                    <button onClick={() => dispatch(setPackaging('all'))}>×</button>
                  </span>
                )}
                {origin !== 'all' && (
                  <span className="filter-chip">
                    Origine: {origin === 'dz' ? 'Algérie' : 'Import'}
                    <button onClick={() => dispatch(setOrigin('all'))}>×</button>
                  </span>
                )}
                {onlyDiscounted && (
                  <span className="filter-chip">
                    En Promotion
                    <button onClick={() => dispatch(toggleDiscounted())}>×</button>
                  </span>
                )}
                {onlyOrganic && (
                  <span className="filter-chip">
                    Bio
                    <button onClick={() => dispatch(toggleOrganic())}>×</button>
                  </span>
                )}
              </div>
            )}

            {/* Grille des Cartes Produits */}
            {filteredProducts.length > 0 ? (
              <div className="fruico-products-grid">
                {filteredProducts.map(product => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    onQuickView={onQuickView}
                    onNotify={onNotify}
                  />
                ))}
              </div>
            ) : (
              <div className="catalog-empty-state-box">
                <Frown size={44} className="text-frost mb-2" />
                <h3 className="empty-heading">Aucun fruit ne correspond à votre sélection</h3>
                <p className="empty-subtext">
                  Modifiez vos critères de recherche ou réinitialisez les filtres pour découvrir tout le catalogue.
                </p>
                <button
                  onClick={() => dispatch(resetFilters())}
                  className="btn-primary mt-4"
                >
                  <RotateCcw size={15} />
                  <span>Réinitialiser les filtres</span>
                </button>
              </div>
            )}
          </main>
        </div>
      </div>
    </section>
  );
}
