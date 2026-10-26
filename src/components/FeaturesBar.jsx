import React from 'react';
import { Snowflake, Truck, ShieldCheck, HeartPulse } from 'lucide-react';

export default function FeaturesBar() {
  const features = [
    {
      icon: <Snowflake className="retail-trust-icon text-cyan" size={24} />,
      title: "Chaîne du froid -18°C",
      desc: "Emballages isothermes certifiés avec blocs de froid négatif."
    },
    {
      icon: <Truck className="retail-trust-icon text-accent" size={24} />,
      title: "Livraison 58 Wilayas",
      desc: "Expédition frigorifique rapide. Gratuite dès 5 000 DZD."
    },
    {
      icon: <HeartPulse className="retail-trust-icon text-red" size={24} />,
      title: "100% Fruits Purs & IQF",
      desc: "Surgélation unitaire, aucun fruit collé en bloc, zéro sucre ajouté."
    },
    {
      icon: <ShieldCheck className="retail-trust-icon text-emerald" size={24} />,
      title: "Paiement à la Réception",
      desc: "Réglez en toute sécurité en espèces lors de la livraison."
    }
  ];

  return (
    <section className="retail-trust-bar">
      <div className="container">
        <div className="trust-items-grid">
          {features.map((item, idx) => (
            <div key={idx} className="trust-item-box">
              <div className="trust-icon-box">
                {item.icon}
              </div>
              <div className="trust-text-box">
                <h4 className="trust-title">{item.title}</h4>
                <p className="trust-desc">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
