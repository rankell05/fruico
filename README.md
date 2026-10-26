# ❄️ FRUICO - Boutique E-Commerce de Fruits Surgelés (-18°C)

> **Higher National School of Advanced Technologies (ENSTA)**  
> **Spécialité :** SS - Premier Semestre 2026  
> **Module :** WAMD (Web and Mobile Development)  
> **TD - TP 2 :** Create a React Application with Redux for State Management  
> **Enseignant :** Dr. S. SENHADJI  

---

## 1. Informations sur l'Étudiant & le Projet

- **Nom & Prénom de l'Étudiant :** `KELLAKH Ranyme`
- **Nom de l'application / Boutique :** **FRUICO** (Fruico DZ - Surgelés & Fruits Givrés)
- **Thématique & Identité Visuelle :** E-commerce de fruits surgelés haut de gamme en Algérie avec respect absolu de la chaîne du froid (-18°C), prix réels en Dinars Algériens (DZD) et livraison isotherme dans les 58 Wilayas.

---

## 2. Description de l'Application

**FRUICO** est une application web e-commerce moderne conçue avec **React.js** et **Redux** pour la gestion d'état global. Elle propose un catalogue varié de fruits surgelés selon le procédé industriel IQF (*Individually Quick Frozen*), allant des fraises de la Mitidja aux myrtilles sauvages et mix smoothies prêts à l'emploi.

L'objectif principal du projet est d'illustrer la transition d'une application JavaScript traditionnelle vers une architecture basée sur des **composants React modulaires** et de démontrer l'efficacité d'un **store global Redux** lorsque plusieurs composants distants (Navbar, Catalogue, Panier, Modales, Filtres) doivent lire, mettre à jour et synchroniser les mêmes données.

---

## 3. Technologies Utilisées

| Outil / Technologie | Version | Rôle & Utilité dans le projet |
| :--- | :--- | :--- |
| **React.js** | 19.x | Bibliothèque frontend pour la création de composants réutilisables et JSX |
| **Redux Toolkit** | 2.x | Bibliothèque officielle recommandée pour la configuration du Redux Store, actions et reducers |
| **React-Redux** | 9.x | Connexion entre les composants React et le Store Redux (`useSelector`, `useDispatch`, `Provider`) |
| **Vite** | 6.x | Outil de build moderne et serveur de développement ultra-rapide |
| **Lucide React** | Dernier | Pack d'icônes SVG nettes et vectorielles (panier, flocon, cœur, recherche, etc.) |
| **Canvas-Confetti** | Dernier | Animation visuelle lors de la confirmation d'une commande algérienne |
| **CSS3 Moderne** | - | Design system avec mode sombre/clair natif, flexbox, grid, glassmorphism et variables CSS |
| **Local Storage** | Web API | Persistance locale des données du panier, favoris et préférences de thème |

---

## 4. Composants React Principaux (`src/components/`)

L'application respecte la modularité par composants réutilisables :

1. **`Navbar.jsx` :**  
   Barre de navigation principale avec logo interactif, bandeau supérieur chaîne du froid -18°C, barre de recherche instantanée (connectée à Redux), sélecteur de mode sombre/clair, bouton favoris avec badge et bouton panier avec montant total en DZD dynamique.

2. **`HeroBanner.jsx` :**  
   Bannière promotionnelle percutante mettant en valeur la fraîcheur des fruits givrés, les engagements qualité (100% pur fruit, sans sucre ajouté) et boutons d'appel à l'action.

3. **`FeaturesBar.jsx` :**  
   Barre des 4 piliers Fruico : Surgélation IQF, Livraison isotherme 58 Wilayas, 100% Naturel, et Paiement à la livraison (COD).

4. **`CategoryFilters.jsx` :**  
   Filtres de catégories sous forme de badges interactifs : *Tous les Fruits*, *🍓 Fruits Rouges*, *🥭 Fruits Tropicaux*, *🍑 Verger Algérien*, *🥤 Mix & Smoothies*.

5. **`SortAndSearch.jsx` :**  
   Barre d'outils comprenant le tri (prix croissant/décroissant, notes, alphabétique), le curseur de budget max en DZD, les filtres booléens (Bio, En Promotion) et le bouton de réinitialisation.

6. **`ProductCatalog.jsx` :**  
   Composant conteneur qui filtre et trie dynamiquement les données du catalogue et affiche la grille de produits ou un message d'état vide.

7. **`ProductCard.jsx` :**  
   Carte produit réutilisable affichant l'image, badges de promotion/bio, note par étoiles, provenance, prix en DZD, bouton favoris et bouton d'ajout au panier animé.

8. **`ProductModal.jsx` :**  
   Modale de détails produit (Quick View) avec tableau nutritionnel complet, astuces de préparation culinaire/smoothie et **gestion d'état local (`useState`)** pour le sélecteur de quantité avant injection dans le store global Redux.

9. **`CartDrawer.jsx` :**  
   Tiroir coulissant latéral affichant les articles du panier, réglage unitaire des quantités (+ / -), suppression d'un article, jauge de livraison gratuite (seuil de 5 000 DZD), saisie d'un code promo (ex: `ENSTA2026`) et calcul du total TTC en DZD.

10. **`CheckoutModal.jsx` :**  
    Formulaire complet de commande adapté au contexte algérien : Nom & Prénom, Téléphone mobile, sélection de la Wilaya avec frais de port réels, adresse précise, option paiement en espèces à la livraison et confirmation avec célébration confetti.

11. **`FavoritesModal.jsx` :**  
    Modale de consultation de la liste des fruits coup de cœur, avec option d'ajout direct au panier.

12. **`ToastNotification.jsx` :**  
    Notification flottante dynamique informant l'utilisateur de chaque action (ajout au panier, favoris, retrait).

13. **`Footer.jsx` :**  
    Pied de page comprenant les liens rapides, informations de livraison et l'encadré académique officiel ENSTA / Dr. S. SENHADJI.

---

## 5. État Global Redux (`src/redux/`)

Le store Redux centralise l'état global et comprend 4 tranches (*slices*) :

### 1. `cartSlice.js` (Gestion du Panier)
- **State :**
  - `items` : tableau d'objets `{ id, name, price, oldPrice, weight, image, quantity, origin }`
  - `promoCode` : chaîne du code promo actif
  - `discountPercent` : pourcentage de remise calculé
  - `promoError` : message d'erreur si code invalide
- **Actions & Reducers :**
  - `addToCart({ product, quantity })` : ajoute ou incrémente la quantité
  - `removeFromCart(productId)` : supprime un produit du panier
  - `updateQuantity({ id, quantity })` : ajuste la quantité (+ / -)
  - `clearCart()` : vide complètement le panier
  - `applyPromoCode(code)` : valide les codes (`ENSTA2026` = -15%, `FRUICO10` = -10%)
  - `removePromoCode()` : retire la réduction

### 2. `favoritesSlice.js` (Gestion des Favoris)
- **State :**
  - `items` : tableau d'IDs des fruits mis en favoris
- **Actions & Reducers :**
  - `toggleFavorite(productId)` : ajoute ou retire l'article de la wishlist
  - `clearFavorites()` : vide les favoris

### 3. `filterSlice.js` (Gestion des Filtres & Tri)
- **State :**
  - `category` : catégorie sélectionnée (`'all'`, `'fruits-rouges'`, `'tropicaux'`, etc.)
  - `searchQuery` : terme recherché dans la barre de recherche
  - `sortBy` : critère de tri (`'featured'`, `'price-asc'`, `'price-desc'`, `'rating'`, `'name'`)
  - `maxPrice` : budget maximal en DZD (curseur de 600 à 2000 DZD)
  - `onlyOrganic` : booléen (uniquement BIO)
  - `onlyDiscounted` : booléen (uniquement en promotion)
- **Actions & Reducers :**
  - `setCategory`, `setSearchQuery`, `setSortBy`, `setMaxPrice`, `toggleOrganic`, `toggleDiscounted`, `resetFilters`

### 4. `themeSlice.js` (Mode Sombre / Clair)
- **State :**
  - `darkMode` : booléen
- **Actions & Reducers :**
  - `toggleTheme()` : bascule entre mode sombre et mode clair
  - `setTheme(boolean)` : définit un thème précis

---

## 6. Fonctionnalités Implémentées

### ✅ Exigences Fonctionnelles Obligatoires
- [x] Application développée avec **React.js** et **JSX**.
- [x] Composants multiples, réutilisables et découpés proprement.
- [x] Transmission de données via les **props**.
- [x] Utilisation du **state local** (`useState`) pour les états de composants isolés (quantité dans le modal, visibilité des tiroirs, formulaire de commande).
- [x] Gestion des **événements utilisateur** (`onClick`, `onChange`, `onSubmit`, `onKeyDown`).
- [x] Affichage d'un **catalogue de produits** complet avec descriptions, origines et photos.
- [x] Gestion complète du **panier d'achat** (ajout, suppression, calculs en temps réel).
- [x] Configuration d'un **Store Redux** avec **Actions**, **Reducers** et **React-Redux** (`useSelector`, `useDispatch`).
- [x] Interface soignée, responsive et ergonomique.

### 🌟 Fonctionnalités Optionnelles & Bonus Ajoutées
- [x] **Recherche en temps réel** par nom, catégorie ou description.
- [x] **Filtrage par catégorie** dynamique.
- [x] **Modal d'aperçu rapide (Product Details)** avec valeurs nutritionnelles et conseils culinaires.
- [x] **Gestion avancée des quantités** (+ / -) avec protection anti-quantité négative.
- [x] **Calcul du total du panier** (sous-total, remise promo, frais de livraison par wilaya).
- [x] **Jauge de livraison gratuite** (seuil de 5 000 DZD).
- [x] **Système de codes promo** (`ENSTA2026` pour 15% de réduction étudiante, `FRUICO10`).
- [x] **Gestion des Favoris (Wishlist)** avec compteur et modale dédiée.
- [x] **Tri multicritères** (prix croissant/décroissant, popularité, note, nom).
- [x] **Filtre par curseur de prix** (de 600 DZD à 2 000 DZD).
- [x] **Mode Sombre / Mode Clair (Dark / Light Mode)** persistant.
- [x] **Persistance LocalStorage** pour le panier, les favoris et le thème.
- [x] **Procédure de Checkout algérien** avec 14 Wilayas intégrées et mode Paiement à la Livraison.
- [x] **Animation de célébration** (confettis) et numéro de référence de commande.

---

## 7. Instructions pour Exécuter l'Application

### Prérequis
- Avoir installé [Node.js](https://nodejs.org/) (version 18 ou supérieure recommandée).

### Étapes d'installation et de lancement

1. **Cloner ou ouvrir le dossier du projet :**
   ```bash
   cd fruico
   ```

2. **Installer les dépendances du projet :**
   ```bash
   npm install
   ```
   *(Sur Windows PowerShell si les scripts sont restreints, vous pouvez lancer `npm.cmd install`)*

3. **Lancer le serveur de développement Vite :**
   ```bash
   npm run dev
   ```

4. **Accéder à l'application dans votre navigateur :**
   Ouvrez [http://localhost:5173](http://localhost:5173).

5. **Tester la compilation de production :**
   ```bash
   npm run build
   ```

---

## 8. Codes Promo de Test

| Code Promo | Réduction | Description |
| :--- | :--- | :--- |
| **`ENSTA2026`** | **-15%** | Offre spéciale labo WAMD pour les étudiants de l'ENSTA |
| **`FRUICO10`** | **-10%** | Remise de bienvenue Fruico |


Application déployée avec GitHub Pages :
👉 **https://rankell05.github.io/fruico/**
---
*Projet développé dans le cadre des travaux dirigés et pratiques du module WAMD - ENSTA 2026.*
