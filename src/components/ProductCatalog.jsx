import React, { useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { PRODUCTS } from '../data/products';
import ProductCard from './ProductCard';
import CategoryFilters from './CategoryFilters';
import SortAndSearch from './SortAndSearch';
import { resetFilters } from '../redux/filterSlice';
import { Frown } from 'lucide-react';

export default function ProductCatalog({ onQuickView, onNotify }) {
  const dispatch = useDispatch();
  const { 
    category, 
    searchQuery, 
    sortBy, 
    maxPrice, 
    onlyOrganic, 
    onlyDiscounted 
  } = useSelector(state => state.filters);

  // Filtrage et tri mémorisés pour une performance optimale
  const filteredProducts = useMemo(() => {
    return PRODUCTS.filter(item => {
      // Filtre catégorie
      if (category !== 'all' && item.category !== category) {
        return false;
      }
      // Filtre recherche par texte (nom, origine, catégorie)
      if (searchQuery.trim() !== '') {
        const query = searchQuery.toLowerCase().trim();
        const matchesName = item.name.toLowerCase().includes(query);
        const matchesCat = item.categoryName.toLowerCase().includes(query);
        const matchesOrigin = item.origin.toLowerCase().includes(query);
        const matchesDesc = item.description.toLowerCase().includes(query);
        if (!matchesName && !matchesCat && !matchesOrigin && !matchesDesc) {
          return false;
        }
      }
      // Filtre de prix maximum
      if (item.price > maxPrice) {
        return false;
      }
      // Filtre bio
      if (onlyOrganic && !item.isOrganic) {
        return false;
      }
      // Filtre promotions
      if (onlyDiscounted && item.discountPercent <= 0) {
        return false;
      }

      return true;
    }).sort((a, b) => {
      if (sortBy === 'price-asc') return a.price - b.price;
      if (sortBy === 'price-desc') return b.price - a.price;
      if (sortBy === 'rating') return b.rating - a.rating;
      if (sortBy === 'name') return a.name.localeCompare(b.name);
      return 0; // 'featured' garde l'ordre par défaut
    });
  }, [category, searchQuery, sortBy, maxPrice, onlyOrganic, onlyDiscounted]);

  return (
    <section className="catalog-section" id="catalogue">
      <div className="container">
        {/* Titre de section */}
        <div className="section-header">
          <div className="section-subtitle-pill">Catalogue 100% Frais & Givré</div>
          <h2 className="section-title">Nos Fruits Surgelés Haut de Gamme</h2>
          <p className="section-desc">
            Sélectionnés avec soin pour leur goût naturel, leur haute teneur en nutriments et conditionnés en sachets hermétiques de 500g et 1kg.
          </p>
        </div>

        {/* Barre de filtres de catégories */}
        <CategoryFilters />

        {/* Contrôles de tri, prix et recherche */}
        <SortAndSearch totalProductsCount={filteredProducts.length} />

        {/* Grille de produits */}
        {filteredProducts.length > 0 ? (
          <div className="products-grid">
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
          <div className="empty-catalog-state">
            <Frown size={48} className="text-muted empty-icon" />
            <h3 className="empty-title">Aucun fruit surgelé ne correspond à votre recherche</h3>
            <p className="empty-desc">
              Essayez de modifier vos filtres de prix ou d'effacer les mots-clés saisis.
            </p>
            <button
              onClick={() => dispatch(resetFilters())}
              className="btn btn-primary"
            >
              Réinitialiser tous les filtres
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
