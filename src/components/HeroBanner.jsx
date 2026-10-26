import React from 'react';
import { useDispatch } from 'react-redux';
import { Snowflake, Sparkles, ArrowRight, ShieldCheck, Zap } from 'lucide-react';
import { setCategory, toggleDiscounted } from '../redux/filterSlice';

export default function HeroBanner() {
  const dispatch = useDispatch();

  const scrollToCatalog = () => {
    const catalogElement = document.getElementById('catalogue');
    if (catalogElement) {
      catalogElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleShowPromos = () => {
    dispatch(toggleDiscounted());
    scrollToCatalog();
  };

  return (
    <section className="hero-banner">
      <div className="container hero-container">
        <div className="hero-content">
          <div className="hero-badge">
            <Snowflake size={16} className="text-cyan animate-spin-slow" />
            <span>Surgélation IQF Instantanée à -18°C</span>
            <span className="badge-pill-fresh">100% Pur Fruit</span>
          </div>

          <h1 className="hero-title">
            Le Goût Pur des Fruits, <br />
            <span className="hero-gradient-text">Givrés à la Perfection</span>
          </h1>

          <p className="hero-description">
            Savourez toute l'année des fruits gorgés de vitamines : fraises de la Mitidja,
            mangues fondantes, framboises et myrtilles sauvages. Prêts pour vos smoothies, pâtisseries et glaces maison.
          </p>

          <div className="hero-features-chips">
            <div className="hero-chip">
              <Sparkles size={16} className="text-amber" />
              <span>Zéro sucre ajouté</span>
            </div>
            <div className="hero-chip">
              <ShieldCheck size={16} className="text-emerald" />
              <span>Chaîne du froid certifiée</span>
            </div>
            <div className="hero-chip">
              <Zap size={16} className="text-cyan" />
              <span>Prêt à l'emploi</span>
            </div>
          </div>

          <div className="hero-cta-group">
            <button onClick={scrollToCatalog} className="btn btn-primary btn-large">
              <span>Commander nos Fruits</span>
              <ArrowRight size={18} />
            </button>
            <button onClick={handleShowPromos} className="btn btn-frost btn-large">
              <span>Voir les Promos du Mois</span>
            </button>
          </div>
        </div>

        {/* Illustration visuelle avec carte fruit flottante */}
        <div className="hero-visual">
          <div className="hero-image-wrapper">
            <img 
              src="https://images.unsplash.com/photo-1502741224143-90386d7f8c82?auto=format&fit=crop&w=800&q=80" 
              alt="Assortiment de baies et fruits surgelés Fruico" 
              className="hero-main-img"
            />
            <div className="hero-frost-overlay"></div>
            
            {/* Carte flottante 1: Fraises locales */}
            <div className="floating-card floating-card-1">
              <span className="floating-emoji">🍓</span>
              <div>
                <div className="floating-title">Fraises de Mitidja</div>
                <div className="floating-price">680 DZD <small>/ 1 kg</small></div>
              </div>
            </div>

            {/* Carte flottante 2: Température certifiée */}
            <div className="floating-card floating-card-2">
              <div className="floating-temp-icon">
                <Snowflake size={20} className="text-cyan" />
              </div>
              <div>
                <div className="floating-title">Conservation -18°C</div>
                <div className="floating-subtitle">Qualité & fraîcheur préservées</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
