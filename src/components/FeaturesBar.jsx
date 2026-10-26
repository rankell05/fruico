import React from 'react';
import { Snowflake, Truck, ShieldCheck, HeartPulse } from 'lucide-react';

export default function FeaturesBar() {
  const features = [
    {
      icon: <Snowflake size={22} className="text-royal" />,
      title: "Chaîne du froid -18°C",
      desc: "Emballage isotherme certifié et glace carbonique."
    },
    {
      icon: <Truck size={22} className="text-frost" />,
      title: "Livraison 58 Wilayas",
      desc: "Expédition frigorifique rapide. Gratuite dès 5 000 DZD."
    },
    {
      icon: <HeartPulse size={22} className="text-royal" />,
      title: "100% Fruits Purs IQF",
      desc: "Surgélation unitaire, zéro sucre ajouté ni additif."
    },
    {
      icon: <ShieldCheck size={22} className="text-frost" />,
      title: "Paiement à la Livraison",
      desc: "Réglez en toute sécurité en espèces à réception."
    }
  ];

  return (
    <section className="features-trust-strip">
      <div className="container">
        <div className="trust-grid-responsive">
          {features.map((item, idx) => (
            <div key={idx} className="trust-card-item">
              <div className="trust-icon-circle">
                {item.icon}
              </div>
              <div className="trust-info-block">
                <h4 className="trust-heading">{item.title}</h4>
                <p className="trust-subtext">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
