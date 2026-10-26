import React from 'react';
import { Snowflake, Truck, ShieldCheck, HeartPulse } from 'lucide-react';

export default function FeaturesBar() {
  const features = [
    {
      icon: <Snowflake className="feature-icon text-cyan" size={28} />,
      title: "Technologie IQF -18°C",
      desc: "Chaque fruit est surgelé individuellement en quelques minutes pour préserver 100% du croquant et des vitamines."
    },
    {
      icon: <Truck className="feature-icon text-indigo" size={28} />,
      title: "Livraison Isotherme 58 Wilayas",
      desc: "Expédition dans des colis isothermes avec accumulateurs de froid. Arrivée parfaitement givrée chez vous."
    },
    {
      icon: <HeartPulse className="feature-icon text-berry" size={28} />,
      title: "100% Fruits Purs & Naturels",
      desc: "Zéro conservateur, zéro sirop, zéro colorant. Uniquement le fruit mûr récolté en saison."
    },
    {
      icon: <ShieldCheck className="feature-icon text-emerald" size={28} />,
      title: "Paiement à la Réception",
      desc: "Réglez votre commande en toute sérénité en dinars algériens (DZD) lors de la livraison à domicile."
    }
  ];

  return (
    <section className="features-bar-section" id="engagements">
      <div className="container">
        <div className="features-grid">
          {features.map((item, idx) => (
            <div key={idx} className="feature-card">
              <div className="feature-icon-wrapper">
                {item.icon}
              </div>
              <h3 className="feature-title">{item.title}</h3>
              <p className="feature-desc">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
