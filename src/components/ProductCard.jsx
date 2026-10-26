import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Heart, Plus, Eye, Star, Snowflake, Check } from 'lucide-react';
import { addToCart } from '../redux/cartSlice';
import { toggleFavorite } from '../redux/favoritesSlice';

export default function ProductCard({ product, onQuickView, onNotify }) {
  const dispatch = useDispatch();
  const favoriteIds = useSelector(state => state.favorites.items);
  const isFavorite = favoriteIds.includes(product.id);

  const [addedAnimation, setAddedAnimation] = useState(false);

  const handleAddToCart = (e) => {
    e.stopPropagation();
    dispatch(addToCart({ product, quantity: 1 }));
    setAddedAnimation(true);
    if (onNotify) {
      onNotify(`❄️ ${product.name} ajouté au panier !`);
    }
    setTimeout(() => {
      setAddedAnimation(false);
    }, 1200);
  };

  const handleToggleFavorite = (e) => {
    e.stopPropagation();
    dispatch(toggleFavorite(product.id));
    if (onNotify) {
      onNotify(isFavorite ? `Retiré des favoris` : `❤️ Ajouté aux favoris !`);
    }
  };

  return (
    <article className="product-card">
      {/* Badges supérieurs */}
      <div className="product-card-top-badges">
        {product.discountPercent > 0 && (
          <span className="badge badge-berry">-{product.discountPercent}%</span>
        )}
        {product.isOrganic && (
          <span className="badge badge-emerald">BIO</span>
        )}
        {product.badge && !product.discountPercent && (
          <span className="badge badge-frost">{product.badge}</span>
        )}
      </div>

      {/* Bouton Favoris */}
      <button 
        onClick={handleToggleFavorite}
        className={`card-favorite-btn ${isFavorite ? 'is-fav' : ''}`}
        title={isFavorite ? "Retirer des favoris" : "Ajouter aux favoris"}
        aria-label="Ajouter aux favoris"
      >
        <Heart size={18} className={isFavorite ? "fill-red text-red" : ""} />
      </button>

      {/* Image du fruit surgelé */}
      <div className="product-image-container" onClick={() => onQuickView(product)}>
        <img 
          src={product.image} 
          alt={product.name} 
          className="product-card-img"
          loading="lazy"
        />
        <div className="product-temp-chip">
          <Snowflake size={12} className="text-cyan" />
          <span>{product.temperature}</span>
        </div>

        {/* Bouton d'aperçu rapide au survol */}
        <button 
          className="quick-view-overlay-btn"
          onClick={(e) => {
            e.stopPropagation();
            onQuickView(product);
          }}
        >
          <Eye size={16} />
          <span>Aperçu rapide</span>
        </button>
      </div>

      {/* Contenu et informations */}
      <div className="product-card-body">
        <div className="product-card-meta">
          <span className="product-card-cat">{product.categoryName}</span>
          <span className="product-card-weight">{product.weight}</span>
        </div>

        <h3 className="product-card-title" onClick={() => onQuickView(product)}>
          {product.name}
        </h3>

        <div className="product-card-origin">
          <span>{product.origin}</span>
        </div>

        {/* Note et avis */}
        <div className="product-card-rating">
          <div className="stars-wrapper">
            {[...Array(5)].map((_, i) => (
              <Star 
                key={i} 
                size={13} 
                className={i < Math.floor(product.rating) ? "star-filled" : "star-empty"} 
              />
            ))}
          </div>
          <span className="rating-score">{product.rating}</span>
          <span className="rating-count">({product.reviewsCount})</span>
        </div>

        {/* Prix en DZD et Bouton d'action */}
        <div className="product-card-footer">
          <div className="product-price-box">
            <span className="product-current-price">
              {product.price.toLocaleString()} <span className="dzd-currency">DZD</span>
            </span>
            {product.oldPrice && (
              <span className="product-old-price">
                {product.oldPrice.toLocaleString()} DZD
              </span>
            )}
          </div>

          <button
            onClick={handleAddToCart}
            className={`btn-add-to-cart ${addedAnimation ? 'btn-added' : ''}`}
            disabled={addedAnimation}
            title="Ajouter au panier"
          >
            {addedAnimation ? (
              <>
                <Check size={16} />
                <span>Ajouté</span>
              </>
            ) : (
              <>
                <Plus size={16} />
                <span>Ajouter</span>
              </>
            )}
          </button>
        </div>
      </div>
    </article>
  );
}
