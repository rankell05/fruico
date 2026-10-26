import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { 
  X, 
  Minus, 
  Plus, 
  ShoppingCart, 
  Heart, 
  Snowflake, 
  Star, 
  CheckCircle, 
  ShieldCheck,
  Flame,
  Truck,
  RotateCcw
} from 'lucide-react';
import { addToCart } from '../redux/cartSlice';
import { toggleFavorite } from '../redux/favoritesSlice';

export default function ProductModal({ product, onClose, onNotify }) {
  const dispatch = useDispatch();
  const favoriteIds = useSelector(state => state.favorites.items);
  const isFavorite = favoriteIds.includes(product?.id);

  // État local React pour la quantité sélectionnée
  const [selectedQuantity, setSelectedQuantity] = useState(1);

  // Fermeture par touche Échap
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
      <div className="ecommerce-modal-dialog" onClick={(e) => e.stopPropagation()}>
        {/* Bouton Fermer */}
        <button className="modal-close-icon-btn" onClick={onClose} aria-label="Fermer la fiche produit">
          <X size={20} />
        </button>

        <div className="modal-two-columns">
          {/* Colonne Gauche : Photo réelle du fruit surgelé */}
          <div className="modal-image-column">
            <div className="modal-photo-container">
              <img src={product.image} alt={product.name} className="modal-main-fruit-img" />
              <div className="modal-temp-guarantee">
                <Snowflake size={14} className="text-cyan" />
                <span>Chaîne du froid certifiée {product.temperature}</span>
              </div>
            </div>

            {/* Badges de labels */}
            <div className="modal-labels-flex">
              {product.isAlgerian && (
                <span className="modal-badge-chip origin">🇩🇿 Terroir Algérien</span>
              )}
              {product.isOrganic && (
                <span className="modal-badge-chip bio">🌿 100% Naturel & Bio</span>
              )}
              <span className="modal-badge-chip weight">📦 Sachet de {product.weight}</span>
            </div>
          </div>

          {/* Colonne Droite : Fiche détaillée de vente en ligne */}
          <div className="modal-details-column">
            <div className="modal-category-path">
              <span>Rayon : {product.categoryName}</span>
            </div>

            <h2 className="modal-product-name">{product.name}</h2>

            <div className="modal-ratings-line">
              <div className="modal-stars-group">
                {[...Array(5)].map((_, i) => (
                  <Star 
                    key={i} 
                    size={15} 
                    className={i < Math.floor(product.rating) ? "star-gold" : "star-muted"} 
                  />
                ))}
              </div>
              <span className="modal-rating-val">{product.rating} / 5</span>
              <span className="modal-reviews-count">({product.reviewsCount} avis clients certifiés)</span>
            </div>

            {/* Prix en Dinars Algériens & Prix au kilo */}
            <div className="modal-price-container">
              <div className="modal-price-tag">
                <span className="modal-current-price">
                  {product.price.toLocaleString()} <span className="modal-dzd">DZD</span>
                </span>
                {product.oldPrice && (
                  <span className="modal-old-price">
                    {product.oldPrice.toLocaleString()} DZD
                  </span>
                )}
                {product.discountPercent > 0 && (
                  <span className="modal-promo-pill">Économisez {product.discountPercent}%</span>
                )}
              </div>
              <div className="modal-unit-price-desc">
                Prix au kilo : <strong>{product.unitPriceDesc}</strong>
              </div>
            </div>

            {/* Disponibilité & Délai de livraison */}
            <div className="modal-stock-banner">
              <div className="stock-line">
                <span className="stock-bullet-green"></span>
                <span><strong>En stock</strong> à l'entrepôt frigorifique central</span>
              </div>
              <div className="delivery-line">
                <Truck size={14} className="text-accent" />
                <span>Livraison frigorifique disponible dans les 58 Wilayas</span>
              </div>
            </div>

            {/* Description complète */}
            <p className="modal-long-desc">{product.description}</p>

            {/* Tableau des valeurs nutritionnelles */}
            {product.nutrition && (
              <div className="modal-nutrition-table-box">
                <div className="nutrition-table-header">
                  <Flame size={15} className="text-red" />
                  <span>Valeurs nutritionnelles moyennes (pour 100g de fruit)</span>
                </div>
                <div className="nutrition-items-row">
                  <div className="nutrition-cell">
                    <span className="nutri-label">Énergie</span>
                    <span className="nutri-val">{product.nutrition.calories}</span>
                  </div>
                  <div className="nutrition-cell">
                    <span className="nutri-label">Vitamine C</span>
                    <span className="nutri-val">{product.nutrition.vitamineC}</span>
                  </div>
                  <div className="nutrition-cell">
                    <span className="nutri-label">Fibres</span>
                    <span className="nutri-val">{product.nutrition.fibres}</span>
                  </div>
                  <div className="nutrition-cell">
                    <span className="nutri-label">Sucres</span>
                    <span className="nutri-val">{product.nutrition.sucre}</span>
                  </div>
                </div>
              </div>
            )}

            {/* Astuce de préparation & décongélation */}
            <div className="modal-prep-box">
              <strong>Conseil du chef :</strong> {product.prepTip}
            </div>

            {/* Actions d'achat (Sélecteur de quantité & Ajout au panier) */}
            <div className="modal-buy-controls-bar">
              <div className="modal-qty-selector">
                <button 
                  onClick={handleDecrease}
                  className="modal-qty-btn"
                  disabled={selectedQuantity <= 1}
                  aria-label="Diminuer"
                >
                  <Minus size={16} />
                </button>
                <span className="modal-qty-count">{selectedQuantity}</span>
                <button 
                  onClick={handleIncrease}
                  className="modal-qty-btn"
                  aria-label="Augmenter"
                >
                  <Plus size={16} />
                </button>
              </div>

              <button 
                onClick={handleAddToCart}
                className="btn-primary modal-cart-action-btn"
              >
                <ShoppingCart size={18} />
                <span>Ajouter au Panier • {calculatedTotal.toLocaleString()} DZD</span>
              </button>

              <button 
                onClick={handleToggleFavorite}
                className={`modal-wishlist-btn ${isFavorite ? 'active' : ''}`}
                title="Ajouter à mes favoris"
              >
                <Heart size={20} className={isFavorite ? "fill-royal text-royal" : ""} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
