import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { 
  Heart, 
  ShoppingCart, 
  Eye, 
  Star, 
  Snowflake, 
  Plus, 
  Minus 
} from 'lucide-react';
import { addToCart, updateQuantity, removeFromCart } from '../redux/cartSlice';
import { toggleFavorite } from '../redux/favoritesSlice';

export default function ProductCard({ product, onQuickView, onNotify }) {
  const dispatch = useDispatch();
  const favoriteIds = useSelector(state => state.favorites.items);
  const cartItems = useSelector(state => state.cart.items);

  const isFavorite = favoriteIds.includes(product.id);
  
  // Vérifier la présence dans le panier
  const cartItem = cartItems.find(item => item.id === product.id);
  const quantityInCart = cartItem ? cartItem.quantity : 0;

  const handleAddToCart = (e) => {
    e.stopPropagation();
    dispatch(addToCart({ product, quantity: 1 }));
    if (onNotify) {
      onNotify(`❄️ ${product.name} ajouté au panier !`);
    }
  };

  const handleIncrease = (e) => {
    e.stopPropagation();
    dispatch(updateQuantity({ id: product.id, quantity: quantityInCart + 1 }));
  };

  const handleDecrease = (e) => {
    e.stopPropagation();
    if (quantityInCart === 1) {
      dispatch(removeFromCart(product.id));
      if (onNotify) onNotify(`Article retiré du panier`);
    } else {
      dispatch(updateQuantity({ id: product.id, quantity: quantityInCart - 1 }));
    }
  };

  const handleToggleFavorite = (e) => {
    e.stopPropagation();
    dispatch(toggleFavorite(product.id));
    if (onNotify) {
      onNotify(isFavorite ? `Retiré des favoris` : `❤️ Ajouté aux favoris !`);
    }
  };

  return (
    <article className="fruico-product-card">
      {/* Badges Commerciaux */}
      <div className="card-badges-container">
        {product.discountPercent > 0 && (
          <span className="card-pill badge-promo">-{product.discountPercent}%</span>
        )}
        {product.isOrganic && (
          <span className="card-pill badge-bio">BIO</span>
        )}
        {product.isAlgerian && (
          <span className="card-pill badge-dz">🇩🇿 Terroir DZ</span>
        )}
      </div>

      {/* Bouton Favoris */}
      <button 
        onClick={handleToggleFavorite}
        className={`card-wishlist-btn ${isFavorite ? 'active' : ''}`}
        title={isFavorite ? "Retirer des favoris" : "Ajouter aux favoris"}
        aria-label="Ajouter aux favoris"
      >
        <Heart size={17} className={isFavorite ? "fill-royal text-royal" : ""} />
      </button>

      {/* Image du fruit avec aperçu rapide au clic */}
      <div className="card-image-wrapper" onClick={() => onQuickView(product)}>
        <img 
          src={product.image} 
          alt={product.name} 
          className="card-fruit-img"
          loading="lazy"
        />

        <div className="card-frost-chip">
          <Snowflake size={11} className="text-royal" />
          <span>{product.temperature}</span>
        </div>

        <button 
          className="card-quick-view-btn"
          onClick={(e) => {
            e.stopPropagation();
            onQuickView(product);
          }}
          title="Fiche produit détaillée"
        >
          <Eye size={15} />
          <span>Aperçu rapide</span>
        </button>
      </div>

      {/* Informations de la carte */}
      <div className="card-body-content">
        <div className="card-meta-line">
          <span className="card-cat-name">{product.categoryName}</span>
          <span className="card-format-tag">{product.weight}</span>
        </div>

        <h3 className="card-title-text" onClick={() => onQuickView(product)} title={product.name}>
          {product.name}
        </h3>

        <div className="card-origin-line">
          <span>{product.origin}</span>
        </div>

        {/* Note étoiles */}
        <div className="card-stars-line">
          <div className="card-stars-flex">
            {[...Array(5)].map((_, i) => (
              <Star 
                key={i} 
                size={11} 
                className={i < Math.floor(product.rating) ? "star-active" : "star-inactive"} 
              />
            ))}
          </div>
          <span className="card-rating-text">{product.rating}</span>
          <span className="card-reviews-text">({product.reviewsCount})</span>
        </div>

        {/* Prix en Dinars Algériens & Prix au kilo */}
        <div className="card-pricing-block">
          <div className="card-price-row">
            <span className="card-price-dzd">
              {product.price.toLocaleString()} <span className="dzd-label">DZD</span>
            </span>
            {product.oldPrice && (
              <span className="card-price-strikethrough">
                {product.oldPrice.toLocaleString()} DZD
              </span>
            )}
          </div>
          <div className="card-kilo-price">
            soit {product.unitPriceDesc}
          </div>
        </div>

        {/* Indicateur de stock */}
        <div className="card-stock-indicator">
          <span className="stock-green-dot"></span>
          <span className="stock-desc-text">En stock ({product.stockCount} dispo)</span>
        </div>

        {/* Bouton d'action / Stepper interactif */}
        <div className="card-action-area">
          {quantityInCart === 0 ? (
            <button
              onClick={handleAddToCart}
              className="btn-add-cart-card"
              title="Ajouter au panier"
            >
              <ShoppingCart size={15} />
              <span>Ajouter</span>
            </button>
          ) : (
            <div className="card-qty-stepper-box">
              <button
                onClick={handleDecrease}
                className="stepper-btn minus"
                aria-label="Diminuer"
              >
                <Minus size={14} />
              </button>
              <span className="stepper-count-num">
                <strong>{quantityInCart}</strong> dans le panier
              </span>
              <button
                onClick={handleIncrease}
                className="stepper-btn plus"
                aria-label="Augmenter"
              >
                <Plus size={14} />
              </button>
            </div>
          )}
        </div>
      </div>
    </article>
  );
}
