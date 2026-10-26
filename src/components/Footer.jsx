import React from 'react';
import { Snowflake, MapPin, Phone, Mail, Award, Truck, Heart } from 'lucide-react';
import Logo from './Logo';

export default function Footer() {
  return (
    <footer className="fruico-site-footer" id="livraison">
      {/* Bandeau supérieur de réassurance */}
      <div className="footer-trust-strip">
        <div className="container footer-strip-flex">
          <div className="footer-strip-item">
            <Snowflake size={20} className="text-ice" />
            <div>
              <div className="strip-item-title">Surgélation IQF Instantanée</div>
              <div className="strip-item-desc">Vitamines & saveurs naturelles intactes</div>
            </div>
          </div>
          <div className="footer-strip-item">
            <Truck size={20} className="text-frost" />
            <div>
              <div className="strip-item-title">Livraison Isotherme DZ</div>
              <div className="strip-item-desc">58 Wilayas couvertes à -18°C</div>
            </div>
          </div>
          <div className="footer-strip-item">
            <Award size={20} className="text-ice" />
            <div>
              <div className="strip-item-title">100% Qualité Naturelle</div>
              <div className="strip-item-desc">Zéro sucre ajouté, zéro conservateur</div>
            </div>
          </div>
        </div>
      </div>

      <div className="container footer-main-body">
        <div className="footer-columns-grid">
          {/* Colonne 1: Marque */}
          <div className="footer-col brand-col">
            <div className="footer-logo-wrap">
              <Logo light={true} />
            </div>
            <p className="footer-mission-text">
              Fruico est la référence algérienne des fruits surgelés haut de gamme. Récoltés à pleine maturité et surgelés selon le procédé industriel IQF pour préserver la fraîcheur de vos smoothies, pâtisseries et petits-déjeuners.
            </p>
            <div className="footer-temp-pill">
              <Snowflake size={14} className="text-ice" />
              <span>Conservation garantie à <strong>-18°C</strong></span>
            </div>
          </div>

          {/* Colonne 2: Rayons */}
          <div className="footer-col">
            <h4 className="footer-title">Nos Rayons</h4>
            <ul className="footer-links">
              <li><a href="#catalogue-section">🍓 Fruits Rouges & Baies Sauvages</a></li>
              <li><a href="#catalogue-section">🥭 Fruits Exotiques (Mangue, Ananas, Maracuja)</a></li>
              <li><a href="#catalogue-section">🍑 Verger Algérien (Fraises, Pêches, Cerises)</a></li>
              <li><a href="#catalogue-section">🥤 Préparations & Mix Smoothies</a></li>
              <li><a href="#catalogue-section">🌿 Fruits 100% Naturels & Bio</a></li>
            </ul>
          </div>

          {/* Colonne 3: Livraison en Algérie */}
          <div className="footer-col">
            <h4 className="footer-title">Expédition Frigorifique</h4>
            <ul className="footer-links">
              <li><span>Alger, Tipaza, Blida, Boumerdès (24h)</span></li>
              <li><span>Oran, Tlemcen, Mostaganem (24-48h)</span></li>
              <li><span>Constantine, Sétif, Annaba, Batna (24-48h)</span></li>
              <li><span>Caissons isothermes avec glace carbonique</span></li>
              <li><span className="free-ship-tag">Offerte dès 5 000 DZD d'achats</span></li>
            </ul>
          </div>

          {/* Colonne 4: Cadre Académique ENSTA */}
          <div className="footer-col academic-col">
            <h4 className="footer-title">Cadre Académique</h4>
            <div className="academic-card-box">
              <div className="ensta-badge">ENSTA Algérie</div>
              <div className="ensta-school">École Nationale Supérieure des Technologies Avancées</div>
              <div className="ensta-details">Module : WAMD (Web and Mobile Development)</div>
              <div className="ensta-details">TD - TP 2 : React.js & Redux State Management</div>
              <div className="ensta-prof">Enseignant : <strong>Dr. S. SENHADJI</strong></div>
              <div className="ensta-year">Année Universitaire : 2026</div>
            </div>
          </div>
        </div>

        <div className="footer-copyright-row">
          <div className="copyright-text">
            © 2026 <strong>FRUICO Algérie</strong>. Réalisé avec React.js & Redux Toolkit pour le TP WAMD - ENSTA.
          </div>
          <div className="footer-note">
            <span>Fraîcheur givrée garantie à -18°C</span>
            <Snowflake size={14} className="text-ice inline" />
          </div>
        </div>
      </div>
    </footer>
  );
}
