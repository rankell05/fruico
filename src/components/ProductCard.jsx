import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { 
  Heart, 
  ShoppingCart, 
  Eye, 
  Star, 
  Snowflake, 
  Plus, 
  Minus,
  Check
} from 'lucide-react';
import { addToCart, updateQuantity, removeFromCart } from '../redux/cartSlice';
import { toggleFavorite } from '../redux/favoritesSlice';

export default function ProductCard({ product, onQuickView, onNotify }) {
  const dispatch = useDispatch();
  const favoriteIds = useSelector(state => state.favorites.items);
  const cartItems = useSelector(state => state.cart.items);

  const isFavorite = favoriteIds.includes(product.id);
  
  // Vérifier si le produit est déjà présent dans le panier Redux
  const cartItem = cartItems.find(item => item.id === product.id);
  const quantityInCart = cartItem ? cartItem.quantity : 0;

  const handleAddToCart = (e) => {
    e.stopPropagation();
    dispatch(addToCart({ product, quantity: 1 }));
    if (onNotify) {
      onNotify(`❄️ ${product.name} ajouté au panier !`);
    }
  };

  const handleIncreaseQuantity = (e) => {
    e.stopPropagation();
    dispatch(updateQuantity({ id: product.id, quantity: quantityInCart + 1 }));
  };

  const handleDecreaseQuantity = (e) => {
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
      onNotify(isFavorite ? `Retiré de vos favoris` : `❤️ Ajouté à vos favoris !`);
    }
  };

  return (
    <article className="retail-product-card">
      {/* Top Badges (Retail discounts, Bio, Algerian Terroir) */}
      <div className="card-top-badges-container">
        {product.discountPercent > 0 && (
          <span className="retail-badge badge-discount">-{product.discountPercent}%</span>
        )}
        {product.isOrganic && (
          <span className="retail-badge badge-bio">BIO</span>
        )}
        {product.isAlgerian && (
          <span className="retail-badge badge-origin">🇩🇿 Terroir DZ</span>
        )}
      </div>

      {/* Bouton Favoris */}
      <button 
        onClick={handleToggleFavorite}
        className={`card-fav-icon-btn ${isFavorite ? 'is-favorite' : ''}`}
        title={isFavorite ? "Retirer des favoris" : "Ajouter aux favoris"}
        aria-label="Ajouter aux favoris"
      >
        <Heart size={18} className={isFavorite ? "fill-red text-red" : ""} />
      </button>

      {/* Zone Image Produit avec zoom doux et aperçu rapide */}
      <div className="card-image-box" onClick={() => onQuickView(product)}>
        <img 
          src={product.image} 
          alt={product.name} 
          className="card-main-image"
          loading="lazy"
        />

        {/* Badge Température Surgélation */}
        <div className="card-frost-badge">
          <Snowflake size={11} className="text-cyan" />
          <span>{product.temperature}</span>
        </div>

        {/* Bouton d'aperçu rapide au survol */}
        <button 
          className="card-quick-view-hover"
          onClick={(e) => {
            e.stopPropagation();
            onQuickView(product);
          }}
          title="Voir la fiche détaillée et valeurs nutritionnelles"
        >
          <Eye size={15} />
          <span>Aperçu rapide</span>
        </button>
      </div>

      {/* Corps de la carte */}
      <div className="card-content-box">
        {/* Catégorie & Provenance */}
        <div className="card-meta-row">
          <span className="card-category-tag">{product.categoryName}</span>
          <span className="card-weight-pill">{product.weight}</span>
        </div>

        {/* Titre du produit */}
        <h3 className="card-product-title" onClick={() => onQuickView(product)} title={product.name}>
          {product.name}
        </h3>

        {/* Origine précise */}
        <div className="card-origin-info">
          <span>Origine : {product.origin}</span>
        </div>

        {/* Évaluation & Avis */}
        <div className="card-rating-row">
          <div className="rating-stars-list">
            {[...Array(5)].map((_, i) => (
              <Star 
                key={i} 
                size={12} 
                className={i < Math.floor(product.rating) ? "star-gold" : "star-muted"} 
              />
            ))}
          </div>
          <span className="rating-num">{product.rating}</span>
          <span className="rating-reviews-count">({product.reviewsCount})</span>
        </div>

        {/* Prix en Dinars Algériens & Prix au kilo */}
        <div className="card-pricing-area">
          <div className="price-main-line">
            <span className="card-final-price">
              {product.price.toLocaleString()} <span className="currency-unit">DZD</span>
            </span>
            {product.oldPrice && (
              <span className="card-strikethrough-price">
                {product.oldPrice.toLocaleString()} DZD
              </span>
            )}
          </div>
          <div className="card-price-per-kilo">
            soit {product.unitPriceDesc}
          </div>
        </div>

        {/* Disponibilité en stock */}
        <div className="card-stock-status">
          <span className="stock-dot"></span>
          <span className="stock-text">En stock ({product.stockCount} dispo)</span>
        </div>

        {/* E-Commerce Interactive Quantity Stepper / Add to Cart */}
        <div className="card-action-bottom">
          {quantityInCart === 0 ? (
            <button
              onClick={handleAddToCart}
              className="btn-card-add-cart"
              title="Ajouter au panier"
            >
              <ShoppingCart size={16} />
              <span>Ajouter au Panier</span>
            </button>
          ) : (
            <div className="card-active-qty-stepper">
              <button
                onClick={handleDecreaseQuantity}
                className="qty-stepper-btn minus"
                title="Diminuer la quantité"
                aria-label="Diminuer"
              >
                <Minus size={15} />
              </button>
              <span className="qty-stepper-display">
                <strong>{quantityInCart}</strong> dans le panier
              </span>
              <button
                onClick={handleIncreaseQuantity}
                className="qty-stepper-btn plus"
                title="Augmenter la quantité"
                aria-label="Augmenter"
              >
                <Plus size={15} />
              </button>
            </div>
          )}
        </div>
      </div>
    </article>
  );
}
