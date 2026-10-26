import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { SlidersHorizontal, ArrowUpDown, Sparkles, Tag, RotateCcw } from 'lucide-react';
import { 
  setSortBy, 
  setMaxPrice, 
  toggleOrganic, 
  toggleDiscounted, 
  resetFilters 
} from '../redux/filterSlice';

export default function SortAndSearch({ totalProductsCount }) {
  const dispatch = useDispatch();
  const { 
    sortBy, 
    maxPrice, 
    onlyOrganic, 
    onlyDiscounted, 
    searchQuery, 
    category 
  } = useSelector(state => state.filters);

  const hasActiveFilters = category !== 'all' || 
    searchQuery !== '' || 
    sortBy !== 'featured' || 
    maxPrice < 2000 || 
    onlyOrganic || 
    onlyDiscounted;

  return (
    <div className="filter-controls-bar">
      <div className="filter-controls-left">
        {/* Compteur de résultats */}
        <div className="product-results-count">
          <span>{totalProductsCount}</span> fruit{totalProductsCount > 1 ? 's' : ''} surgelé{totalProductsCount > 1 ? 's' : ''} trouvé{totalProductsCount > 1 ? 's' : ''}
        </div>

        {/* Badges de filtrage rapide (Bio, Promo) */}
        <div className="quick-filter-toggles">
          <button
            onClick={() => dispatch(toggleOrganic())}
            className={`filter-toggle-btn ${onlyOrganic ? 'active' : ''}`}
          >
            <Sparkles size={14} />
            <span>Bio & Naturel</span>
          </button>

          <button
            onClick={() => dispatch(toggleDiscounted())}
            className={`filter-toggle-btn ${onlyDiscounted ? 'active' : ''}`}
          >
            <Tag size={14} />
            <span>En Promo</span>
          </button>
        </div>
      </div>

      <div className="filter-controls-right">
        {/* Curseur de prix max (en DZD) */}
        <div className="price-slider-box">
          <span className="price-slider-label">Prix max: <strong>{maxPrice} DZD</strong></span>
          <input
            type="range"
            min="600"
            max="2000"
            step="50"
            value={maxPrice}
            onChange={(e) => dispatch(setMaxPrice(Number(e.target.value)))}
            className="price-range-slider"
          />
        </div>

        {/* Sélecteur de tri */}
        <div className="sort-dropdown-box">
          <ArrowUpDown size={15} className="sort-icon text-muted" />
          <select
            value={sortBy}
            onChange={(e) => dispatch(setSortBy(e.target.value))}
            className="sort-select"
          >
            <option value="featured">Recommandés</option>
            <option value="price-asc">Prix : Moins cher d'abord</option>
            <option value="price-desc">Prix : Plus cher d'abord</option>
            <option value="rating">Meilleures notes (★)</option>
            <option value="name">Nom alphabétique (A-Z)</option>
          </select>
        </div>

        {/* Réinitialisation rapide */}
        {hasActiveFilters && (
          <button
            onClick={() => dispatch(resetFilters())}
            className="btn-reset-filters"
            title="Effacer tous les filtres"
          >
            <RotateCcw size={14} />
            <span>Réinitialiser</span>
          </button>
        )}
      </div>
    </div>
  );
}
