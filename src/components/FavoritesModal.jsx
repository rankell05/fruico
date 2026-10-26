import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { X, Heart, ShoppingCart, Trash2, Snowflake } from 'lucide-react';
import { PRODUCTS } from '../data/products';
import { toggleFavorite, clearFavorites } from '../redux/favoritesSlice';
import { addToCart } from '../redux/cartSlice';

export default function FavoritesModal({ isOpen, onClose, onNotify }) {
  const dispatch = useDispatch();
  const favoriteIds = useSelector(state => state.favorites.items);

  if (!isOpen) return null;

  // Récupérer les objets complets des produits favoris
  const favoriteProducts = PRODUCTS.filter(p => favoriteIds.includes(p.id));

  const handleAddToCart = (product) => {
    dispatch(addToCart({ product, quantity: 1 }));
    if (onNotify) {
      onNotify(`❄️ ${product.name} ajouté au panier !`);
    }
  };

  const handleRemoveFavorite = (productId, name) => {
    dispatch(toggleFavorite(productId));
    if (onNotify) {
      onNotify(`Retiré des favoris`);
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="favorites-modal-dialog" onClick={(e) => e.stopPropagation()}>
        {/* En-tête */}
        <div className="favorites-header">
          <div className="favorites-title-box">
            <Heart size={22} className="text-royal fill-royal" />
            <h2 className="favorites-title">Mes Fruits Coup de Cœur</h2>
            <span className="favorites-counter-badge">
              {favoriteProducts.length} favori{favoriteProducts.length > 1 ? 's' : ''}
            </span>
          </div>

          <button onClick={onClose} className="modal-close-btn" aria-label="Fermer">
            <X size={20} />
          </button>
        </div>

        {/* Corps des favoris */}
        <div className="favorites-body">
          {favoriteProducts.length === 0 ? (
            <div className="favorites-empty-state">
              <Heart size={44} className="text-muted empty-heart-icon" />
              <h3>Aucun fruit en favoris pour le moment</h3>
              <p>
                Cliquez sur le petit cœur d'un produit pour le retrouver facilement ici plus tard.
              </p>
              <button onClick={onClose} className="btn btn-primary mt-4">
                Découvrir le catalogue
              </button>
            </div>
          ) : (
            <div className="favorites-list">
              {favoriteProducts.map(product => (
                <div key={product.id} className="favorite-item-card">
                  <img src={product.image} alt={product.name} className="favorite-item-img" />

                  <div className="favorite-item-info">
                    <span className="favorite-item-cat">{product.categoryName} • {product.weight}</span>
                    <h4 className="favorite-item-title">{product.name}</h4>
                    <div className="favorite-item-price">
                      {product.price.toLocaleString()} <span className="dzd-currency">DZD</span>
                    </div>
                  </div>

                  <div className="favorite-item-actions">
                    <button
                      onClick={() => handleAddToCart(product)}
                      className="btn btn-primary btn-sm"
                      title="Ajouter au panier"
                    >
                      <ShoppingCart size={15} />
                      <span>Ajouter</span>
                    </button>

                    <button
                      onClick={() => handleRemoveFavorite(product.id, product.name)}
                      className="btn-remove-fav"
                      title="Retirer des favoris"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Pied des favoris */}
        {favoriteProducts.length > 0 && (
          <div className="favorites-footer">
            <button
              onClick={() => {
                if (window.confirm("Effacer tous vos favoris ?")) {
                  dispatch(clearFavorites());
                }
              }}
              className="btn-clear-favorites"
            >
              <Trash2 size={14} />
              <span>Effacer tous mes favoris</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
