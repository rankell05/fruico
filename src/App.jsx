import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import Navbar from './components/Navbar';
import HeroBanner from './components/HeroBanner';
import FeaturesBar from './components/FeaturesBar';
import ProductCatalog from './components/ProductCatalog';
import ProductModal from './components/ProductModal';
import CartDrawer from './components/CartDrawer';
import CheckoutModal from './components/CheckoutModal';
import FavoritesModal from './components/FavoritesModal';
import ToastNotification from './components/ToastNotification';
import Footer from './components/Footer';
import './App.css';

export default function App() {
  const darkMode = useSelector(state => state.theme.darkMode);

  // États locaux de l'interface (modales et tiroirs)
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isFavoritesOpen, setIsFavoritesOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [quickViewProduct, setQuickViewProduct] = useState(null);
  const [toastMessage, setToastMessage] = useState('');

  // Gestion du mode sombre / clair sur le document
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
      document.body.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
      document.body.classList.remove('dark');
    }
  }, [darkMode]);

  // Déclenchement d'un toast avec fermeture automatique
  const triggerToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage('');
    }, 3200);
  };

  const handleProceedToCheckout = () => {
    setIsCartOpen(false);
    setIsCheckoutOpen(true);
  };

  return (
    <div className={`app-root ${darkMode ? 'dark' : 'light'}`}>
      {/* Barre de navigation */}
      <Navbar 
        onOpenCart={() => setIsCartOpen(true)}
        onOpenFavorites={() => setIsFavoritesOpen(true)}
      />

      <main className="main-content">
        {/* Bannière Hero avec présentation des fruits givrés */}
        <HeroBanner />

        {/* Barre des 4 engagements qualité / chaîne du froid */}
        <FeaturesBar />

        {/* Catalogue complet avec recherche, filtres et tri */}
        <ProductCatalog 
          onQuickView={(product) => setQuickViewProduct(product)}
          onNotify={triggerToast}
        />
      </main>

      {/* Pied de page avec mentions académiques ENSTA */}
      <Footer />

      {/* Tiroir Panier latéral */}
      <CartDrawer 
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        onProceedToCheckout={handleProceedToCheckout}
        onNotify={triggerToast}
      />

      {/* Modal de prévisualisation détaillée d'un fruit */}
      {quickViewProduct && (
        <ProductModal 
          product={quickViewProduct}
          onClose={() => setQuickViewProduct(null)}
          onNotify={triggerToast}
        />
      )}

      {/* Modal de commande / Checkout algérien */}
      <CheckoutModal 
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
      />

      {/* Modal des Favoris */}
      <FavoritesModal 
        isOpen={isFavoritesOpen}
        onClose={() => setIsFavoritesOpen(false)}
        onNotify={triggerToast}
      />

      {/* Notification Toast dynamique */}
      <ToastNotification 
        message={toastMessage}
        onClose={() => setToastMessage('')}
      />
    </div>
  );
}
