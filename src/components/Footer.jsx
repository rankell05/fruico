import React from 'react';
import { Snowflake, MapPin, Phone, Mail, Award, Truck, Heart } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="site-footer" id="livraison">
      {/* Bannière de réassurance */}
      <div className="footer-top-strip">
        <div className="container footer-strip-content">
          <div className="strip-item">
            <Snowflake size={20} className="text-cyan" />
            <div>
              <div className="strip-title">Surgélation IQF Ultra-Rapide</div>
              <div className="strip-desc">Texture et saveurs intactes</div>
            </div>
          </div>
          <div className="strip-item">
            <Truck size={20} className="text-berry" />
            <div>
              <div className="strip-title">Livraison Isotherme DZ</div>
              <div className="strip-desc">58 Wilayas couvertes</div>
            </div>
          </div>
          <div className="strip-item">
            <Award size={20} className="text-amber" />
            <div>
              <div className="strip-title">100% Qualité Naturelle</div>
              <div className="strip-desc">Sans aucun conservateur ni sucre ajouté</div>
            </div>
          </div>
        </div>
      </div>

      <div className="container footer-main-content">
        <div className="footer-cols-grid">
          {/* Colonne 1: Présentation Fruico */}
          <div className="footer-col brand-col">
            <div className="footer-brand">
              <Snowflake size={26} className="text-cyan" />
              <span className="brand-name">FRUICO<span className="brand-dot">.dz</span></span>
            </div>
            <p className="footer-about-text">
              Fruico est la première marque algérienne dédiée à la distribution de fruits surgelés haut de gamme. Récoltés à maturité optimale et congelés immédiatement pour vos smoothies, pâtisseries et petits déjeuners sains.
            </p>
            <div className="footer-temp-tag">
              <Snowflake size={14} className="text-cyan" />
              <span>Température de stockage constante : <strong>-18°C</strong></span>
            </div>
          </div>

          {/* Colonne 2: Liens rapides */}
          <div className="footer-col">
            <h4 className="footer-col-title">Nos Catégories</h4>
            <ul className="footer-links-list">
              <li><a href="#catalogue">🍓 Fruits Rouges & Baies Sauvages</a></li>
              <li><a href="#catalogue">🥭 Fruits Tropicaux (Mangue, Ananas, Maracuja)</a></li>
              <li><a href="#catalogue">🍑 Verger Algérien (Pêches, Cerises de Miliana)</a></li>
              <li><a href="#catalogue">🥤 Mix & Smoothies Détox</a></li>
              <li><a href="#catalogue">🌿 Fruits 100% BIO & Sans Sucre</a></li>
            </ul>
          </div>

          {/* Colonne 3: Livraison en Algérie */}
          <div className="footer-col">
            <h4 className="footer-col-title">Livraison 58 Wilayas</h4>
            <ul className="footer-links-list">
              <li><span>Alger, Tipaza, Blida, Boumerdès (24h)</span></li>
              <li><span>Oran, Tlemcen, Mostaganem (24-48h)</span></li>
              <li><span>Constantine, Sétif, Annaba, Batna (24-48h)</span></li>
              <li><span>Colis isothermes avec maintien à -18°C</span></li>
              <li><span className="highlight-free-ship">Gratuit dès 5 000 DZD d'achats</span></li>
            </ul>
          </div>

          {/* Colonne 4: Projet ENSTA WAMD */}
          <div className="footer-col academic-col">
            <h4 className="footer-col-title">Cadre Académique</h4>
            <div className="academic-badge-box">
              <div className="ensta-title">ENSTA Algérie</div>
              <div className="ensta-sub">École Nationale Supérieure des Technologies Avancées</div>
              <div className="ensta-module">Module : WAMD (Web and Mobile Development)</div>
              <div className="ensta-tp">TD - TP 2 : React.js & Redux State Management</div>
              <div className="ensta-prof">Enseignant : <strong>Dr. S. SENHADJI</strong></div>
              <div className="ensta-year">Année Universitaire : 2026</div>
            </div>
          </div>
        </div>

        <div className="footer-bottom-bar">
          <div className="copyright-text">
            © 2026 <strong>FRUICO Algérie</strong>. Réalisé avec React.js & Redux Toolkit pour le TP WAMD - ENSTA.
          </div>
          <div className="footer-dev-note">
            <span>Fait avec passion & fraîcheur givrée</span>
            <Heart size={14} className="text-red inline fill-red" />
          </div>
        </div>
      </div>
    </footer>
  );
}
