import React from 'react';
import { useDispatch } from 'react-redux';
import { Snowflake, Truck, Tag, ArrowRight, Sparkles } from 'lucide-react';
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
    <section className="hero-retail-section">
      <div className="container hero-layout-flex">
        {/* Grande Bannière Principale */}
        <div className="hero-main-card">
          <div className="hero-text-block">
            <div className="hero-frost-chip">
              <Sparkles size={14} className="text-ice" />
              <span>Surgélation IQF Instantanée à -18°C</span>
            </div>

            <h1 className="hero-headline">
              Le Marché des Fruits Surgelés <br />
              <span className="hero-subline">100% Naturels, Cueillis à Maturité</span>
            </h1>

            <p className="hero-paragraph">
              Fraises de la Mitidja, mangues fondantes, framboises et myrtilles sauvages. Surgélation rapide préservant toutes les vitamines sans aucun sucre ajouté.
            </p>

            <div className="hero-guarantees-row">
              <div className="guarantee-item">
                <Snowflake size={15} className="text-ice" />
                <span>Chaîne du froid certifiée (-18°C)</span>
              </div>
              <div className="guarantee-item">
                <Truck size={15} className="text-frost" />
                <span>Livraison 58 Wilayas (Gratuite dès 5 000 DZD)</span>
              </div>
            </div>

            <div className="hero-cta-flex">
              <button onClick={scrollToCatalog} className="btn-hero-primary">
                <span>Découvrir le Catalogue</span>
                <ArrowRight size={17} />
              </button>
              <button onClick={handleShowPromos} className="btn-hero-secondary">
                <Tag size={16} />
                <span>Promotions du Mois (-15%)</span>
              </button>
            </div>
          </div>

          <div className="hero-image-block">
            <img 
              src="/images/products/fraises.jpg" 
              alt="Fraises surgelées de la Mitidja" 
              className="hero-fruit-img"
            />
            <div className="hero-price-badge">
              <span className="badge-prod-title">Fraises de Mitidja 1kg</span>
              <span className="badge-prod-price">680 DZD <small>800 DZD</small></span>
              <span className="badge-prod-save">Remise immédiate -15%</span>
            </div>
          </div>
        </div>

        {/* Colonne Promos Secondaires (Desktop & Tablette) */}
        <div className="hero-side-column hide-mobile">
          <div 
            className="side-banner-card card-smoothie"
            onClick={() => { dispatch(setCategory('smoothies-mix')); scrollToCatalog(); }}
          >
            <div className="side-banner-text">
              <span className="side-pill">PACK FAMILIAL</span>
              <h3 className="side-banner-title">Mix Smoothies & Bowls</h3>
              <p className="side-banner-desc">4 portions de 250g prêtes à mixer</p>
              <span className="side-banner-price">Dès 1 290 DZD</span>
            </div>
            <img src="/images/products/fruits-mix.jpg" alt="Mix fruits" className="side-banner-img" />
          </div>

          <div className="side-banner-card card-cold">
            <div className="side-banner-text">
              <div className="cold-frost-icon">
                <Snowflake size={22} className="text-royal" />
              </div>
              <h3 className="side-banner-title">Garantie Froid -18°C</h3>
              <p className="side-banner-desc">
                Caissons isothermes avec glace carbonique jusqu'à votre congélateur.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
