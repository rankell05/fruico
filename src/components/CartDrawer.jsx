import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { 
  X, 
  Trash2, 
  Plus, 
  Minus, 
  ShoppingCart, 
  ArrowRight, 
  Tag, 
  Check, 
  AlertCircle,
  Truck,
  Sparkles,
  Snowflake,
  ShieldCheck
} from 'lucide-react';
import { 
  removeFromCart, 
  updateQuantity, 
  clearCart, 
  applyPromoCode, 
  removePromoCode 
} from '../redux/cartSlice';
import { FREE_SHIPPING_THRESHOLD } from '../data/products';

export default function CartDrawer({ isOpen, onClose, onProceedToCheckout, onNotify }) {
  const dispatch = useDispatch();
  const { items, promoCode, discountPercent, promoError } = useSelector(state => state.cart);

  const [inputCode, setInputCode] = useState('');

  if (!isOpen) return null;

  // Calculs financiers en Dinars Algériens (DZD)
  const subtotal = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const discountAmount = Math.round((subtotal * discountPercent) / 100);
  const remainingForFreeShipping = Math.max(0, FREE_SHIPPING_THRESHOLD - subtotal);
  const freeShippingProgress = Math.min(100, Math.round((subtotal / FREE_SHIPPING_THRESHOLD) * 100));

  // Livraison gratuite dès 5000 DZD ou panier vide
  const baseShippingFee = subtotal >= FREE_SHIPPING_THRESHOLD || subtotal === 0 ? 0 : 450;
  const grandTotal = Math.max(0, subtotal - discountAmount + baseShippingFee);

  const handleApplyPromo = (e) => {
    e.preventDefault();
    if (!inputCode.trim()) return;
    dispatch(applyPromoCode(inputCode));
    setInputCode('');
  };

  const handleRemoveItem = (id, name) => {
    dispatch(removeFromCart(id));
    if (onNotify) {
      onNotify(`🗑️ ${name} retiré du panier`);
    }
  };

  return (
    <div className="drawer-overlay" onClick={onClose}>
      <aside className="ecommerce-cart-drawer" onClick={(e) => e.stopPropagation()}>
        {/* En-tête du Panier */}
        <div className="cart-header-row">
          <div className="cart-title-with-badge">
            <ShoppingCart size={22} className="text-accent" />
            <h2 className="cart-main-heading">Mon Panier</h2>
            <span className="cart-badge-total-items">
              {items.reduce((acc, it) => acc + it.quantity, 0)} articles
            </span>
          </div>

          <button onClick={onClose} className="cart-close-btn" aria-label="Fermer le panier">
            <X size={20} />
          </button>
        </div>

        {/* Barre de progression de la livraison gratuite */}
        {items.length > 0 && (
          <div className="cart-free-shipping-box">
            <div className="free-shipping-status-line">
              <Truck size={16} className="text-cyan" />
              {remainingForFreeShipping > 0 ? (
                <span>
                  Plus que <strong>{remainingForFreeShipping.toLocaleString()} DZD</strong> pour la <strong>Livraison Gratuite</strong> !
                </span>
              ) : (
                <span className="free-shipping-achieved">
                  <Sparkles size={14} className="text-amber inline" /> Livraison frigorifique offerte !
                </span>
              )}
            </div>
            <div className="free-shipping-track">
              <div 
                className="free-shipping-bar" 
                style={{ width: `${freeShippingProgress}%` }}
              ></div>
            </div>
          </div>
        )}

        {/* Liste des articles du panier */}
        <div className="cart-scroll-items-area">
          {items.length === 0 ? (
            <div className="cart-empty-wrapper">
              <div className="cart-empty-icon-circle">
                <Snowflake size={36} className="text-cyan" />
              </div>
              <h3 className="empty-cart-title">Votre panier est actuellement vide</h3>
              <p className="empty-cart-text">
                Remplissez votre congélateur de fruits savoureux pour vos smoothies, glaces et desserts !
              </p>
              <button onClick={onClose} className="btn-ecommerce-primary mt-4">
                Découvrir nos fruits surgelés
              </button>
            </div>
          ) : (
            <div className="cart-products-list">
              {items.map((item) => {
                const itemTotal = item.price * item.quantity;
                return (
                  <div key={item.id} className="cart-single-item-card">
                    <img src={item.image} alt={item.name} className="cart-product-thumb" />

                    <div className="cart-product-details">
                      <div className="cart-product-header">
                        <h4 className="cart-item-title">{item.name}</h4>
                        <button
                          onClick={() => handleRemoveItem(item.id, item.name)}
                          className="cart-delete-item-btn"
                          title="Supprimer cet article"
                        >
                          <Trash2 size={15} />
                        </button>
                      </div>

                      <div className="cart-item-weight-line">
                        <span>Format : {item.weight}</span>
                        <span>•</span>
                        <span>{item.price.toLocaleString()} DZD / sachet</span>
                      </div>

                      <div className="cart-item-bottom-controls">
                        {/* Stepper de quantité (+ / -) */}
                        <div className="cart-stepper">
                          <button
                            onClick={() => dispatch(updateQuantity({ id: item.id, quantity: item.quantity - 1 }))}
                            className="cart-stepper-btn"
                            aria-label="Diminuer"
                          >
                            <Minus size={13} />
                          </button>
                          <span className="cart-stepper-number">{item.quantity}</span>
                          <button
                            onClick={() => dispatch(updateQuantity({ id: item.id, quantity: item.quantity + 1 }))}
                            className="cart-stepper-btn"
                            aria-label="Augmenter"
                          >
                            <Plus size={13} />
                          </button>
                        </div>

                        {/* Sous-total de la ligne */}
                        <div className="cart-line-total-price">
                          {itemTotal.toLocaleString()} <span className="dzd-small">DZD</span>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Pied de Panier avec Code Promo et Résumé financier */}
        {items.length > 0 && (
          <div className="cart-sticky-footer">
            {/* Formulaire de Code Promo */}
            <form onSubmit={handleApplyPromo} className="cart-promo-container">
              <div className="promo-input-wrapper">
                <Tag size={15} className="text-muted" />
                <input
                  type="text"
                  placeholder="Code promo (ex: ENSTA2026)"
                  value={inputCode}
                  onChange={(e) => setInputCode(e.target.value)}
                  className="promo-text-field"
                />
                <button type="submit" className="promo-btn-apply">
                  Appliquer
                </button>
              </div>

              {promoError && (
                <div className="promo-error-alert">
                  <AlertCircle size={13} />
                  <span>{promoError}</span>
                </div>
              )}

              {promoCode && (
                <div className="promo-success-alert">
                  <Check size={13} />
                  <span>Code <strong>{promoCode}</strong> appliqué (-{discountPercent}%)</span>
                  <button 
                    type="button" 
                    onClick={() => dispatch(removePromoCode())}
                    className="promo-btn-remove"
                  >
                    <X size={12} />
                  </button>
                </div>
              )}
            </form>

            {/* Tableau récapitulatif */}
            <div className="cart-financial-summary">
              <div className="financial-row">
                <span>Sous-total articles</span>
                <span>{subtotal.toLocaleString()} DZD</span>
              </div>

              {discountAmount > 0 && (
                <div className="financial-row discount-line">
                  <span>Remise déduite ({discountPercent}%)</span>
                  <span>-{discountAmount.toLocaleString()} DZD</span>
                </div>
              )}

              <div className="financial-row">
                <span>Frais de livraison frigorifique</span>
                <span>
                  {baseShippingFee === 0 ? (
                    <strong className="text-emerald">Gratuite (≥ 5 000 DZD)</strong>
                  ) : (
                    `${baseShippingFee} DZD`
                  )}
                </span>
              </div>

              <div className="financial-separator"></div>

              <div className="financial-row total-highlight-row">
                <span>Total à régler (TTC)</span>
                <span className="total-highlight-price">
                  {grandTotal.toLocaleString()} <small>DZD</small>
                </span>
              </div>
            </div>

            {/* Boutons d'action */}
            <div className="cart-checkout-actions">
              <button
                onClick={() => {
                  onClose();
                  onProceedToCheckout();
                }}
                className="btn-ecommerce-primary btn-block checkout-btn-pulse"
              >
                <span>Commander ({grandTotal.toLocaleString()} DZD)</span>
                <ArrowRight size={18} />
              </button>

              <button
                onClick={() => {
                  if (window.confirm("Êtes-vous sûr de vouloir vider l'ensemble du panier ?")) {
                    dispatch(clearCart());
                  }
                }}
                className="btn-clear-cart-text"
              >
                <Trash2 size={13} />
                <span>Vider le panier</span>
              </button>
            </div>
          </div>
        )}
      </aside>
    </div>
  );
}
