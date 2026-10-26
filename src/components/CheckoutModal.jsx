import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { 
  X, 
  CheckCircle2, 
  Truck, 
  ShieldCheck, 
  Phone, 
  MapPin, 
  User, 
  Snowflake, 
  PackageCheck,
  CreditCard
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { clearCart } from '../redux/cartSlice';
import { WILAYAS_ALGERIE, FREE_SHIPPING_THRESHOLD } from '../data/products';

export default function CheckoutModal({ isOpen, onClose }) {
  const dispatch = useDispatch();
  const { items, promoCode, discountPercent } = useSelector(state => state.cart);

  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    wilayaCode: '16', // Alger par défaut
    address: '',
    deliveryNotes: ''
  });

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [orderRef, setOrderRef] = useState('');

  if (!isOpen) return null;

  // Calcul du sous-total
  const subtotal = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const discountAmount = Math.round((subtotal * discountPercent) / 100);

  // Recherche des frais de livraison de la wilaya sélectionnée
  const selectedWilaya = WILAYAS_ALGERIE.find(w => w.code === formData.wilayaCode) || WILAYAS_ALGERIE[0];
  const shippingFee = subtotal >= FREE_SHIPPING_THRESHOLD ? 0 : selectedWilaya.deliveryFee;
  const finalTotal = Math.max(0, subtotal - discountAmount + shippingFee);

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmitOrder = (e) => {
    e.preventDefault();

    // Génération d'une référence de commande algérienne
    const randomNum = Math.floor(1000 + Math.random() * 9000);
    const newRef = `FRU-DZ-${randomNum}`;
    setOrderRef(newRef);
    setIsSubmitted(true);

    // Animation de confettis festifs
    try {
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 }
      });
    } catch (err) {
      /* ignore */
    }

    // Vider le panier Redux une fois la commande validée
    dispatch(clearCart());
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="checkout-modal-dialog" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close-btn" onClick={onClose} aria-label="Fermer">
          <X size={20} />
        </button>

        {!isSubmitted ? (
          <div className="checkout-layout">
            {/* Formulaire de livraison */}
            <div className="checkout-form-col">
              <div className="checkout-header">
                <PackageCheck size={26} className="text-berry" />
                <div>
                  <h2 className="checkout-title">Finaliser votre Commande</h2>
                  <p className="checkout-subtitle">Livraison frigorifique express à domicile</p>
                </div>
              </div>

              <form onSubmit={handleSubmitOrder} className="checkout-form">
                {/* Nom complet */}
                <div className="form-group">
                  <label htmlFor="fullName" className="form-label">
                    <User size={15} />
                    <span>Nom & Prénom</span>
                  </label>
                  <input
                    type="text"
                    id="fullName"
                    name="fullName"
                    required
                    placeholder="ex: Amina Belkacem"
                    value={formData.fullName}
                    onChange={handleChange}
                    className="form-input"
                  />
                </div>

                {/* Téléphone */}
                <div className="form-group">
                  <label htmlFor="phone" className="form-label">
                    <Phone size={15} />
                    <span>Numéro de téléphone (Mobile)</span>
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    required
                    placeholder="0550 12 34 56 ou 0770..."
                    value={formData.phone}
                    onChange={handleChange}
                    className="form-input"
                  />
                </div>

                {/* Wilaya d'Algérie */}
                <div className="form-group">
                  <label htmlFor="wilayaCode" className="form-label">
                    <MapPin size={15} />
                    <span>Wilaya de livraison</span>
                  </label>
                  <select
                    id="wilayaCode"
                    name="wilayaCode"
                    value={formData.wilayaCode}
                    onChange={handleChange}
                    className="form-select"
                  >
                    {WILAYAS_ALGERIE.map(w => (
                      <option key={w.code} value={w.code}>
                        {w.code} - {w.name} ({w.deliveryFee} DZD)
                      </option>
                    ))}
                  </select>
                </div>

                {/* Adresse exacte / Commune */}
                <div className="form-group">
                  <label htmlFor="address" className="form-label">
                    <MapPin size={15} />
                    <span>Commune et Adresse précise</span>
                  </label>
                  <input
                    type="text"
                    id="address"
                    name="address"
                    required
                    placeholder="ex: Cité 500 logts, Bâtiment B, Hydra"
                    value={formData.address}
                    onChange={handleChange}
                    className="form-input"
                  />
                </div>

                {/* Note spéciale pour livreur */}
                <div className="form-group">
                  <label htmlFor="deliveryNotes" className="form-label">
                    <Snowflake size={15} />
                    <span>Instructions de livraison (Optionnel)</span>
                  </label>
                  <textarea
                    id="deliveryNotes"
                    name="deliveryNotes"
                    rows="2"
                    placeholder="ex: Merci d'appeler 15 min avant pour placer immédiatement les fruits au congélateur."
                    value={formData.deliveryNotes}
                    onChange={handleChange}
                    className="form-textarea"
                  ></textarea>
                </div>

                {/* Mode de paiement */}
                <div className="payment-method-box">
                  <div className="payment-badge">
                    <CreditCard size={18} className="text-emerald" />
                    <div>
                      <div className="payment-title">Paiement à la Livraison (COD)</div>
                      <div className="payment-desc">Réglez en espèces à la remise du colis frigorifique.</div>
                    </div>
                  </div>
                </div>

                <button type="submit" className="btn btn-primary btn-block submit-order-btn">
                  <span>Confirmer la commande ({finalTotal.toLocaleString()} DZD)</span>
                </button>
              </form>
            </div>

            {/* Récapitulatif de la commande */}
            <div className="checkout-summary-col">
              <h3 className="summary-col-title">Récapitulatif ({items.length} produit{items.length > 1 ? 's' : ''})</h3>

              <div className="checkout-items-preview">
                {items.map(it => (
                  <div key={it.id} className="preview-item-row">
                    <img src={it.image} alt={it.name} className="preview-item-img" />
                    <div className="preview-item-details">
                      <div className="preview-item-name">{it.name}</div>
                      <div className="preview-item-qty">{it.quantity} x {it.price.toLocaleString()} DZD</div>
                    </div>
                    <div className="preview-item-total">
                      {(it.quantity * it.price).toLocaleString()} DZD
                    </div>
                  </div>
                ))}
              </div>

              <div className="checkout-cost-breakdown">
                <div className="cost-row">
                  <span>Sous-total</span>
                  <span>{subtotal.toLocaleString()} DZD</span>
                </div>

                {discountAmount > 0 && (
                  <div className="cost-row discount-row">
                    <span>Remise Promo ({promoCode})</span>
                    <span>-{discountAmount.toLocaleString()} DZD</span>
                  </div>
                )}

                <div className="cost-row">
                  <span>Livraison ({selectedWilaya.name})</span>
                  <span>
                    {shippingFee === 0 ? (
                      <strong className="text-emerald">Gratuite</strong>
                    ) : (
                      `${shippingFee} DZD`
                    )}
                  </span>
                </div>

                <div className="cost-divider"></div>

                <div className="cost-row grand-total-row">
                  <span>Total à Payer</span>
                  <span className="grand-total-price">
                    {finalTotal.toLocaleString()} <small>DZD</small>
                  </span>
                </div>
              </div>

              {/* Rappel chaîne du froid */}
              <div className="cold-chain-reminder">
                <Snowflake size={18} className="text-cyan" />
                <p>
                  Vos fruits voyageront dans un caisson isotherme réfrigéré à <strong>-18°C</strong>.
                  Conservez-les immédiatement au congélateur à réception.
                </p>
              </div>
            </div>
          </div>
        ) : (
          /* Écran de confirmation de commande réussie */
          <div className="order-success-screen">
            <div className="success-icon-wrapper">
              <CheckCircle2 size={64} className="text-emerald" />
            </div>

            <h2 className="success-title">Commande Confirmée avec Succès !</h2>
            <div className="order-reference-pill">
              Référence : <strong>{orderRef}</strong>
            </div>

            <p className="success-message">
              Merci <strong>{formData.fullName}</strong> ! Votre commande de fruits surgelés est en cours de préparation dans notre entrepôt frigorifique.
            </p>

            <div className="order-details-card">
              <div className="detail-line">
                <MapPin size={16} className="text-muted" />
                <span>Destination : <strong>{selectedWilaya.name} ({formData.address})</strong></span>
              </div>
              <div className="detail-line">
                <Phone size={16} className="text-muted" />
                <span>Contact : <strong>{formData.phone}</strong></span>
              </div>
              <div className="detail-line">
                <Truck size={16} className="text-muted" />
                <span>Délai estimé : <strong>24h à 48h en caisson isotherme</strong></span>
              </div>
              <div className="detail-line">
                <CreditCard size={16} className="text-muted" />
                <span>Montant à régler à la livraison : <strong>{finalTotal.toLocaleString()} DZD</strong></span>
              </div>
            </div>

            <button
              onClick={onClose}
              className="btn btn-primary btn-large mt-6"
            >
              Retourner à la boutique Fruico
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
