import React from 'react';
import { useDispatch } from 'react-redux';
import { Snowflake, Truck, ShieldCheck, Tag, ArrowRight, Sparkles } from 'lucide-react';
import { setCategory, toggleDiscounted } from '../redux/filterSlice';

export default function HeroBanner() {
  const dispatch = useDispatch();

  const scrollToCatalog = () => {
    const el = document.getElementById('catalogue-section');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const handleShowPromos = () => {
    dispatch(toggleDiscounted());
    scrollToCatalog();
  };

  return (
    <section className="ecommerce-hero-section">
      <div className="container hero-grid-wrapper">
        {/* Main Large Promotional Banner (Style Picard / Carrefour) */}
        <div className="main-promo-banner">
          <div className="banner-content">
            <div className="banner-badge">
              <Sparkles size={14} className="text-amber" />
              <span>ARRIVAGE DU MOIS • QUALITÉ IQF -18°C</span>
            </div>

            <h1 className="banner-headline">
              Le Marché des Fruits Surgelés <br />
              <span className="banner-subheadline">100% Naturels, Cueillis à Maturité</span>
            </h1>

            <p className="banner-description">
              Fraises gorgées de soleil de la Mitidja, mangues fondantes, framboises entières et myrtilles sauvages. Surgélation rapide pour préserver toutes les saveurs et vitamines sans aucun sucre ajouté.
            </p>

            <div className="banner-advantages-list">
              <div className="advantage-pill">
                <Snowflake size={14} className="text-cyan" />
                <span>Chaîne du froid certifiée (-18°C)</span>
              </div>
              <div className="advantage-pill">
                <Truck size={14} className="text-accent" />
                <span>Livraison 58 Wilayas (Gratuite dès 5 000 DZD)</span>
              </div>
            </div>

            <div className="banner-cta-group">
              <button onClick={scrollToCatalog} className="btn-ecommerce-primary">
                <span>Découvrir le Catalogue</span>
                <ArrowRight size={17} />
              </button>
              <button onClick={handleShowPromos} className="btn-ecommerce-secondary">
                <Tag size={16} />
                <span>Voir les Promotions (-15%)</span>
              </button>
            </div>
          </div>

          <div className="banner-media-area">
            <img 
              src="/images/products/fraises.jpg" 
              alt="Fraises surgelées Fruico" 
              className="banner-product-image"
            />
            <div className="banner-price-tag-overlay">
              <span className="price-tag-title">Fraises de Mitidja 1kg</span>
              <span className="price-tag-amount">680 DZD <small className="price-tag-old">800 DZD</small></span>
              <span className="price-tag-badge">Économisez 15%</span>
            </div>
          </div>
        </div>

        {/* Side Commercial Promotional Cards (Retail Style) */}
        <div className="side-promo-column">
          {/* Side Card 1: Mix Smoothie */}
          <div 
            className="side-promo-card side-card-smoothie"
            onClick={() => { dispatch(setCategory('smoothies-mix')); scrollToCatalog(); }}
          >
            <div className="side-card-content">
              <span className="side-card-badge">PACK FAMILIAL</span>
              <h3 className="side-card-title">Mix Smoothies & Bowls</h3>
              <p className="side-card-desc">Portions individuelles prêtes à mixer en 30 secondes</p>
              <span className="side-card-price">Dès 1 290 DZD</span>
            </div>
            <img 
              src="/images/products/fruits-mix.jpg" 
              alt="Mix fruits surgelés" 
              className="side-card-img"
            />
          </div>

          {/* Side Card 2: Chaîne du Froid Certifiée */}
          <div className="side-promo-card side-card-cold">
            <div className="side-card-content">
              <div className="cold-icon-circle">
                <Snowflake size={24} className="text-cyan" />
              </div>
              <h3 className="side-card-title">Garantie Froid -18°C</h3>
              <p className="side-card-desc">
                Emballage isotherme avec glace carbonique. Zéro décongélation pendant le transport jusqu'à votre domicile.
              </p>
              <span className="cold-status-text">Contrôle thermomètre à réception</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
