import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { 
  X, 
  Minus, 
  Plus, 
  ShoppingBag, 
  Heart, 
  Snowflake, 
  Star, 
  CheckCircle, 
  ShieldAlert,
  Flame,
  Award
} from 'lucide-react';
import { addToCart } from '../redux/cartSlice';
import { toggleFavorite } from '../redux/favoritesSlice';

export default function ProductModal({ product, onClose, onNotify }) {
  const dispatch = useDispatch();
  const favoriteIds = useSelector(state => state.favorites.items);
  const isFavorite = favoriteIds.includes(product?.id);

  // Utilisation de l'état local (React local state) pour la sélection de quantité
  // comme requis dans le TP (différencier state local vs state global Redux)
  const [selectedQuantity, setSelectedQuantity] = useState(1);

  // Fermer le modal avec la touche Échap
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  if (!product) return null;

  const handleDecrease = () => {
    if (selectedQuantity > 1) setSelectedQuantity(selectedQuantity - 1);
  };

  const handleIncrease = () => {
    setSelectedQuantity(selectedQuantity + 1);
  };

  const handleAddToCart = () => {
    dispatch(addToCart({ product, quantity: selectedQuantity }));
    if (onNotify) {
      onNotify(`❄️ ${selectedQuantity}x ${product.name} ajouté(s) au panier !`);
    }
    onClose();
  };

  const handleToggleFavorite = () => {
    dispatch(toggleFavorite(product.id));
    if (onNotify) {
      onNotify(isFavorite ? `Retiré des favoris` : `❤️ Ajouté aux favoris !`);
    }
  };

  const calculatedTotal = product.price * selectedQuantity;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="product-modal-dialog" onClick={(e) => e.stopPropagation()}>
        {/* Bouton Fermer */}
        <button className="modal-close-btn" onClick={onClose} aria-label="Fermer">
          <X size={20} />
        </button>

        <div className="modal-grid">
          {/* Colonne visuelle */}
          <div className="modal-visual-col">
            <div className="modal-image-wrapper">
              <img src={product.image} alt={product.name} className="modal-product-img" />
              <div className="modal-temp-badge">
                <Snowflake size={14} className="text-cyan" />
                <span>{product.temperature} Contrôlé</span>
              </div>
            </div>

            {/* Origine et labels */}
            <div className="modal-badges-row">
              <span className="badge badge-frost">{product.origin}</span>
              {product.isOrganic && <span className="badge badge-emerald">100% Bio</span>}
              <span className="badge badge-amber">{product.weight}</span>
            </div>
          </div>

          {/* Colonne informations & interactions */}
          <div className="modal-info-col">
            <div className="modal-category">{product.categoryName}</div>
            <h2 className="modal-title">{product.name}</h2>

            {/* Note et avis */}
            <div className="modal-rating-row">
              <div className="stars-wrapper">
                {[...Array(5)].map((_, i) => (
                  <Star 
                    key={i} 
                    size={16} 
                    className={i < Math.floor(product.rating) ? "star-filled" : "star-empty"} 
                  />
                ))}
              </div>
              <span className="rating-score">{product.rating}</span>
              <span className="rating-count">({product.reviewsCount} avis clients vérifiés)</span>
            </div>

            {/* Prix en DZD */}
            <div className="modal-price-box">
              <div className="modal-price-main">
                {product.price.toLocaleString()} <span className="dzd-currency">DZD</span>
              </div>
              {product.oldPrice && (
                <div className="modal-price-old">
                  {product.oldPrice.toLocaleString()} DZD
                </div>
              )}
              {product.discountPercent > 0 && (
                <span className="badge badge-berry">Économisez {product.discountPercent}%</span>
              )}
            </div>

            {/* Description détaillée */}
            <p className="modal-description">{product.description}</p>

            {/* Tableau des valeurs nutritionnelles */}
            {product.nutrition && (
              <div className="modal-nutrition-card">
                <div className="nutrition-header">
                  <Flame size={16} className="text-berry" />
                  <span>Valeurs Nutritionnelles moyennes (pour 100g)</span>
                </div>
                <div className="nutrition-grid">
                  <div className="nutrition-item">
                    <span className="nutrition-label">Énergie</span>
                    <span className="nutrition-value">{product.nutrition.calories}</span>
                  </div>
                  <div className="nutrition-item">
                    <span className="nutrition-label">Vitamine C</span>
                    <span className="nutrition-value">{product.nutrition.vitamineC}</span>
                  </div>
                  <div className="nutrition-item">
                    <span className="nutrition-label">Fibres</span>
                    <span className="nutrition-value">{product.nutrition.fibres}</span>
                  </div>
                  <div className="nutrition-item">
                    <span className="nutrition-label">Sucres</span>
                    <span className="nutrition-value">{product.nutrition.sucre}</span>
                  </div>
                </div>
              </div>
            )}

            {/* Conseil de dégustation */}
            <div className="modal-prep-tip">
              <strong>💡 Astuce Fruico :</strong> {product.prepTip}
            </div>

            {/* Sélecteur de quantité locale (React State) & Ajout au panier Redux */}
            <div className="modal-actions-area">
              <div className="quantity-selector-box">
                <button 
                  onClick={handleDecrease}
                  className="qty-btn"
                  disabled={selectedQuantity <= 1}
                  aria-label="Diminuer la quantité"
                >
                  <Minus size={16} />
                </button>
                <span className="qty-value">{selectedQuantity}</span>
                <button 
                  onClick={handleIncrease}
                  className="qty-btn"
                  aria-label="Augmenter la quantité"
                >
                  <Plus size={16} />
                </button>
              </div>

              <button 
                onClick={handleAddToCart}
                className="btn btn-primary modal-add-cart-btn"
              >
                <ShoppingBag size={18} />
                <span>Ajouter • {calculatedTotal.toLocaleString()} DZD</span>
              </button>

              <button 
                onClick={handleToggleFavorite}
                className={`modal-favorite-btn ${isFavorite ? 'is-fav' : ''}`}
                title="Ajouter aux favoris"
              >
                <Heart size={20} className={isFavorite ? "fill-red text-red" : ""} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
