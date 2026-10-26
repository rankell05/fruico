import React, { useMemo } from 'react';
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
  SlidersHorizontal, 
  ArrowUpDown, 
  RotateCcw, 
  Check, 
  Package, 
  MapPin, 
  Frown, 
  Tag, 
  Sparkles,
  Snowflake,
  Filter
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

  // Filtrage des produits selon tous les critères e-commerce
  const filteredProducts = useMemo(() => {
    return PRODUCTS.filter(item => {
      // 1. Rayon / Catégorie
      if (category !== 'all' && item.category !== category) return false;

      // 2. Recherche par mot-clé
      if (searchQuery.trim() !== '') {
        const q = searchQuery.toLowerCase().trim();
        const matchesName = item.name.toLowerCase().includes(q);
        const matchesCategory = item.categoryName.toLowerCase().includes(q);
        const matchesOrigin = item.origin.toLowerCase().includes(q);
        const matchesDesc = item.description.toLowerCase().includes(q);
        if (!matchesName && !matchesCategory && !matchesOrigin && !matchesDesc) return false;
      }

      // 3. Prix maximal en DZD
      if (item.price > maxPrice) return false;

      // 4. Conditionnement (500g ou 1kg)
      if (packaging !== 'all' && item.packaging !== packaging) return false;

      // 5. Origine (Algérie ou Import)
      if (origin === 'dz' && !item.isAlgerian) return false;
      if (origin === 'import' && item.isAlgerian) return false;

      // 6. Bio uniquement
      if (onlyOrganic && !item.isOrganic) return false;

      // 7. En promotion uniquement
      if (onlyDiscounted && item.discountPercent <= 0) return false;

      // 8. En stock uniquement
      if (onlyInStock && !item.inStock) return false;

      return true;
    }).sort((a, b) => {
      if (sortBy === 'price-asc') return a.price - b.price;
      if (sortBy === 'price-desc') return b.price - a.price;
      if (sortBy === 'rating') return b.rating - a.rating;
      if (sortBy === 'name') return a.name.localeCompare(b.name);
      return 0; // 'featured'
    });
  }, [category, searchQuery, sortBy, maxPrice, packaging, origin, onlyOrganic, onlyDiscounted, onlyInStock]);

  const activeCategoryObj = CATEGORIES.find(c => c.id === category) || CATEGORIES[0];

  const hasActiveFilters = category !== 'all' || 
    searchQuery !== '' || 
    sortBy !== 'featured' || 
    maxPrice < 3000 || 
    packaging !== 'all' || 
    origin !== 'all' || 
    onlyOrganic || 
    onlyDiscounted || 
    onlyInStock;

  return (
    <section className="catalog-ecommerce-section" id="catalogue-section">
      <div className="container">
        {/* Barre de navigation fil d'Ariane (Breadcrumb) */}
        <div className="ecommerce-breadcrumb">
          <a href="#" onClick={() => dispatch(resetFilters())}>Accueil</a>
          <span className="breadcrumb-separator">/</span>
          <span>Marché Surgelés</span>
          <span className="breadcrumb-separator">/</span>
          <span className="breadcrumb-current">{activeCategoryObj.label}</span>
          {searchQuery && (
            <>
              <span className="breadcrumb-separator">/</span>
              <span className="breadcrumb-query">Recherche : « {searchQuery} »</span>
            </>
          )}
        </div>

        {/* Layout E-Commerce : Sidebar Filtres à gauche + Grille Produits à droite */}
        <div className="catalog-layout-grid">
          {/* ========================================================
              SIDEBAR FILTRES (RÉELLEMENT E-COMMERCE)
             ======================================================== */}
          <aside className="catalog-filters-sidebar">
            <div className="sidebar-header">
              <div className="sidebar-title-box">
                <Filter size={18} className="text-accent" />
                <h3 className="sidebar-title">Filtrer les Produits</h3>
              </div>
              {hasActiveFilters && (
                <button 
                  onClick={() => dispatch(resetFilters())} 
                  className="sidebar-reset-btn"
                  title="Réinitialiser tous les filtres"
                >
                  <RotateCcw size={13} />
                  <span>Effacer</span>
                </button>
              )}
            </div>

            {/* 1. Rayons / Catégories */}
            <div className="sidebar-filter-block">
              <h4 className="filter-block-title">Rayons de Surgelés</h4>
              <ul className="sidebar-categories-list">
                {CATEGORIES.map(cat => (
                  <li key={cat.id}>
                    <button
                      className={`sidebar-cat-btn ${category === cat.id ? 'active' : ''}`}
                      onClick={() => dispatch(setCategory(cat.id))}
                    >
                      <span className="cat-btn-label">{cat.label}</span>
                      <span className="cat-btn-count">({cat.count})</span>
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            {/* 2. Budget Max (Slider DZD) */}
            <div className="sidebar-filter-block">
              <div className="filter-title-row">
                <h4 className="filter-block-title">Budget Maximum</h4>
                <span className="price-value-badge">{maxPrice.toLocaleString()} DZD</span>
              </div>
              <input
                type="range"
                min="600"
                max="3000"
                step="50"
                value={maxPrice}
                onChange={(e) => dispatch(setMaxPrice(Number(e.target.value)))}
                className="ecommerce-slider"
              />
              <div className="slider-bounds">
                <span>600 DZD</span>
                <span>3 000 DZD</span>
              </div>
            </div>

            {/* 3. Conditionnement / Poids */}
            <div className="sidebar-filter-block">
              <h4 className="filter-block-title">Format du Sachet</h4>
              <div className="radio-options-list">
                {PACKAGING_OPTIONS.map(pkg => (
                  <label key={pkg.id} className="filter-radio-label">
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

            {/* 4. Origine & Traçabilité */}
            <div className="sidebar-filter-block">
              <h4 className="filter-block-title">Origine Géographique</h4>
              <div className="radio-options-list">
                {ORIGIN_OPTIONS.map(orig => (
                  <label key={orig.id} className="filter-radio-label">
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

            {/* 5. Critères de Qualité (Checkbox Toggles) */}
            <div className="sidebar-filter-block">
              <h4 className="filter-block-title">Critères Spéciaux</h4>
              <div className="checkbox-toggles-list">
                <label className="filter-checkbox-label">
                  <input
                    type="checkbox"
                    checked={onlyDiscounted}
                    onChange={() => dispatch(toggleDiscounted())}
                  />
                  <span>En Promotion du mois</span>
                </label>

                <label className="filter-checkbox-label">
                  <input
                    type="checkbox"
                    checked={onlyOrganic}
                    onChange={() => dispatch(toggleOrganic())}
                  />
                  <span>100% Naturel & BIO</span>
                </label>

                <label className="filter-checkbox-label">
                  <input
                    type="checkbox"
                    checked={onlyInStock}
                    onChange={() => dispatch(toggleInStock())}
                  />
                  <span>En stock immédiat</span>
                </label>
              </div>
            </div>
          </aside>

          {/* ========================================================
              CONTENU PRINCIPAL : HEADER RAYON + GRILLE DE PRODUITS
             ======================================================== */}
          <main className="catalog-products-main">
            {/* Header du catalogue */}
            <div className="catalog-top-header">
              <div className="catalog-title-area">
                <h2 className="catalog-active-title">{activeCategoryObj.label}</h2>
                <span className="catalog-count-text">
                  <strong>{filteredProducts.length}</strong> référence{filteredProducts.length > 1 ? 's' : ''} disponible{filteredProducts.length > 1 ? 's' : ''}
                </span>
              </div>

              {/* Barre de tri e-commerce */}
              <div className="catalog-sort-box">
                <ArrowUpDown size={15} className="sort-icon text-muted" />
                <span className="sort-label hide-mobile">Trier par :</span>
                <select
                  value={sortBy}
                  onChange={(e) => dispatch(setSortBy(e.target.value))}
                  className="catalog-sort-select"
                >
                  <option value="featured">Recommandations</option>
                  <option value="price-asc">Prix : Moins cher d'abord</option>
                  <option value="price-desc">Prix : Plus cher d'abord</option>
                  <option value="rating">Meilleurs avis clients</option>
                  <option value="name">Ordre alphabétique (A-Z)</option>
                </select>
              </div>
            </div>

            {/* Tags des filtres actifs */}
            {hasActiveFilters && (
              <div className="active-filters-tags-row">
                <span className="tags-label">Filtres appliqués :</span>
                {category !== 'all' && (
                  <span className="filter-tag-pill">
                    Rayon: {activeCategoryObj.label}
                    <button onClick={() => dispatch(setCategory('all'))}>×</button>
                  </span>
                )}
                {searchQuery && (
                  <span className="filter-tag-pill">
                    « {searchQuery} »
                    <button onClick={() => dispatch(setSearchQuery(''))}>×</button>
                  </span>
                )}
                {packaging !== 'all' && (
                  <span className="filter-tag-pill">
                    Format: {packaging}
                    <button onClick={() => dispatch(setPackaging('all'))}>×</button>
                  </span>
                )}
                {origin !== 'all' && (
                  <span className="filter-tag-pill">
                    Origine: {origin === 'dz' ? 'Algérie' : 'Import'}
                    <button onClick={() => dispatch(setOrigin('all'))}>×</button>
                  </span>
                )}
                {onlyDiscounted && (
                  <span className="filter-tag-pill">
                    Promotions
                    <button onClick={() => dispatch(toggleDiscounted())}>×</button>
                  </span>
                )}
                {onlyOrganic && (
                  <span className="filter-tag-pill">
                    Bio
                    <button onClick={() => dispatch(toggleOrganic())}>×</button>
                  </span>
                )}
              </div>
            )}

            {/* Grille des Cartes Produits */}
            {filteredProducts.length > 0 ? (
              <div className="retail-products-grid">
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
              /* État vide si aucune correspondance */
              <div className="retail-empty-catalog">
                <Frown size={44} className="text-muted mb-3" />
                <h3 className="empty-title">Aucun fruit ne correspond à vos filtres</h3>
                <p className="empty-desc">
                  Vérifiez l'orthographe de votre recherche ou élargissez vos critères de sélection (prix, conditionnement).
                </p>
                <button
                  onClick={() => dispatch(resetFilters())}
                  className="btn-ecommerce-primary mt-3"
                >
                  <RotateCcw size={16} />
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
