import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { 
  X, 
  Trash2, 
  Plus, 
  Minus, 
  ShoppingBag, 
  ArrowRight, 
  Tag, 
  Check, 
  AlertCircle,
  Truck,
  Sparkles,
  Snowflake
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

  // Estimation des frais de livraison de base (ex: 450 DZD en moyenne)
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
      <aside className="cart-drawer-panel" onClick={(e) => e.stopPropagation()}>
        {/* En-tête du Panier */}
        <div className="cart-drawer-header">
          <div className="cart-header-title-box">
            <ShoppingBag size={22} className="text-berry" />
            <h2 className="cart-header-title">Mon Panier Surgelé</h2>
            <span className="cart-items-counter-badge">
              {items.reduce((acc, it) => acc + it.quantity, 0)} articles
            </span>
          </div>

          <button onClick={onClose} className="drawer-close-btn" aria-label="Fermer le panier">
            <X size={20} />
          </button>
        </div>

        {/* Barre de progression livraison gratuite */}
        {items.length > 0 && (
          <div className="free-shipping-bar-container">
            <div className="free-shipping-text">
              <Truck size={16} className="text-cyan" />
              {remainingForFreeShipping > 0 ? (
                <span>
                  Ajoutez encore <strong>{remainingForFreeShipping.toLocaleString()} DZD</strong> pour la <strong>Livraison Gratuite</strong> !
                </span>
              ) : (
                <span className="free-shipping-unlocked">
                  <Sparkles size={14} className="text-amber inline" /> Félicitations ! Livraison Gratuite débloquée !
                </span>
              )}
            </div>
            <div className="shipping-progress-track">
              <div 
                className="shipping-progress-fill" 
                style={{ width: `${freeShippingProgress}%` }}
              ></div>
            </div>
          </div>
        )}

        {/* Corps du panier : Liste des articles */}
        <div className="cart-drawer-body">
          {items.length === 0 ? (
            <div className="cart-empty-state">
              <div className="cart-empty-icon-box">
                <Snowflake size={40} className="text-cyan" />
              </div>
              <h3>Votre panier est vide</h3>
              <p>
                Vos smoothies et desserts vous attendent ! Découvrez nos fruits surgelés de saison.
              </p>
              <button onClick={onClose} className="btn btn-primary mt-4">
                Explorer nos fruits
              </button>
            </div>
          ) : (
            <div className="cart-items-list">
              {items.map((item) => {
                const itemTotal = item.price * item.quantity;
                return (
                  <div key={item.id} className="cart-item-card">
                    <img src={item.image} alt={item.name} className="cart-item-img" />

                    <div className="cart-item-info">
                      <div className="cart-item-header">
                        <h4 className="cart-item-name">{item.name}</h4>
                        <button
                          onClick={() => handleRemoveItem(item.id, item.name)}
                          className="cart-item-delete-btn"
                          title="Supprimer l'article"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>

                      <div className="cart-item-meta">
                        <span className="cart-item-weight">{item.weight}</span>
                        <span className="cart-item-unit-price">
                          {item.price.toLocaleString()} DZD / unité
                        </span>
                      </div>

                      {/* Sélecteur de quantité & Total de la ligne */}
                      <div className="cart-item-footer">
                        <div className="cart-qty-controls">
                          <button
                            onClick={() => dispatch(updateQuantity({ id: item.id, quantity: item.quantity - 1 }))}
                            className="cart-qty-btn"
                            aria-label="Diminuer"
                          >
                            <Minus size={14} />
                          </button>
                          <span className="cart-qty-number">{item.quantity}</span>
                          <button
                            onClick={() => dispatch(updateQuantity({ id: item.id, quantity: item.quantity + 1 }))}
                            className="cart-qty-btn"
                            aria-label="Augmenter"
                          >
                            <Plus size={14} />
                          </button>
                        </div>

                        <div className="cart-item-subtotal">
                          {itemTotal.toLocaleString()} <span className="dzd-currency">DZD</span>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Pied du panier avec Code Promo et Résumé financier */}
        {items.length > 0 && (
          <div className="cart-drawer-footer">
            {/* Formulaire Code Promo */}
            <form onSubmit={handleApplyPromo} className="promo-code-form">
              <div className="promo-input-group">
                <Tag size={16} className="text-muted" />
                <input
                  type="text"
                  placeholder="Code promo (ex: ENSTA2026)"
                  value={inputCode}
                  onChange={(e) => setInputCode(e.target.value)}
                  className="promo-input"
                />
                <button type="submit" className="promo-apply-btn">
                  Appliquer
                </button>
              </div>

              {promoError && (
                <div className="promo-error-message">
                  <AlertCircle size={14} />
                  <span>{promoError}</span>
                </div>
              )}

              {promoCode && (
                <div className="promo-active-badge">
                  <Check size={14} className="text-emerald" />
                  <span>Remise {promoCode} (-{discountPercent}%) appliquée !</span>
                  <button 
                    type="button" 
                    onClick={() => dispatch(removePromoCode())}
                    className="promo-remove-btn"
                  >
                    <X size={12} />
                  </button>
                </div>
              )}
            </form>

            {/* Récapitulatif des montants */}
            <div className="cart-summary-table">
              <div className="summary-row">
                <span>Sous-total articles</span>
                <span>{subtotal.toLocaleString()} DZD</span>
              </div>

              {discountAmount > 0 && (
                <div className="summary-row discount-row">
                  <span>Remise ({discountPercent}%)</span>
                  <span>-{discountAmount.toLocaleString()} DZD</span>
                </div>
              )}

              <div className="summary-row">
                <span>Livraison frigorifique</span>
                <span>
                  {baseShippingFee === 0 ? (
                    <strong className="text-emerald">Gratuite</strong>
                  ) : (
                    `${baseShippingFee} DZD`
                  )}
                </span>
              </div>

              <div className="summary-divider"></div>

              <div className="summary-row total-row">
                <span>Total estimé (TTC)</span>
                <span className="total-amount-highlight">
                  {grandTotal.toLocaleString()} <small>DZD</small>
                </span>
              </div>
            </div>

            {/* Actions principales du panier */}
            <div className="cart-footer-buttons">
              <button
                onClick={() => {
                  onClose();
                  onProceedToCheckout();
                }}
                className="btn btn-primary btn-block checkout-cta-btn"
              >
                <span>Commander ({grandTotal.toLocaleString()} DZD)</span>
                <ArrowRight size={18} />
              </button>

              <button
                onClick={() => {
                  if (window.confirm("Êtes-vous sûr de vouloir vider tout votre panier ?")) {
                    dispatch(clearCart());
                  }
                }}
                className="btn-clear-cart"
              >
                <Trash2 size={14} />
                <span>Vider le panier</span>
              </button>
            </div>
          </div>
        )}
      </aside>
    </div>
  );
}
