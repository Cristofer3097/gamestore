// App.jsx
import React, { useState, useMemo, useRef } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { gamesMock } from './data/games';
import { useCart } from './hooks/useCart';
import Header from './components/header/Header';
import Home from './pages/Home'; 
import Cart from './pages/Cart';
import Catalog from './pages/Catalog';
import { useFavorites } from './hooks/useFavorites';
import Favorites from './pages/Favorites';
import Toast from './components/Toast';

function App() {
  const { cart, addToCart, removeFromCart, deleteFromCart, clearCart, total, cartCount } = useCart();
  const { favorites, toggleFavorite, isFavorite, moveFavorite } = useFavorites();

  const [toastMsg, setToastMsg] = useState('');
  const [isToastVisible, setIsToastVisible] = useState(false);
  const toastTimeoutRef = useRef(null);

  const showToast = (message) => {
    if (toastTimeoutRef.current) {
      clearTimeout(toastTimeoutRef.current);
      setIsToastVisible(false); 
      setTimeout(() => {
         setToastMsg(message);
         setIsToastVisible(true);
      }, 50); 
    } else {
      setToastMsg(message);
      setIsToastVisible(true);
    }

    toastTimeoutRef.current = setTimeout(() => {
      setIsToastVisible(false);
      toastTimeoutRef.current = null;
    }, 2000);
  };
  const handleAddToCart = (game) => {
    addToCart(game);
    showToast(`🛒 ${game.title} añadido al carrito`);
  };

  const handleToggleFavorite = (game) => {
    const alreadyFav = isFavorite(game.id);
    toggleFavorite(game);
    
    if (!alreadyFav) {
      showToast("❤️ ¡Añadido a lista de deseos!");
    }
  };
  const handleCheckout = () => {
    showToast("🎉 ¡Gracias por tu pedido! Compra finalizada.");
    clearCart();
  };
  
  const [search, setSearch] = useState("");
  const [filters, setFilters] = useState({
    minPrice: 0,
    maxPrice: 100, 
    genres: [],
    platforms: []
  });

  const safeGames = gamesMock || [];

  const allGenres = [...new Set(safeGames.flatMap(g => g.genres || []))];
  const allPlatforms = [...new Set(safeGames.flatMap(g => g.platforms || []))];


  const filteredGames = useMemo(() => {
    return safeGames.filter(game => {

      
      const gameTitle = game.title ? game.title.toLowerCase() : "";
      const searchTerm = search.toLowerCase();
      const gamePrice = game.price || 0;
      const gameGenres = game.genres || [];  
      const gamePlatforms = game.platforms || [];

      // 1. Filtro Buscador (Texto)
      const matchesSearch = gameTitle.includes(searchTerm);
      
      // 2. Filtro Precio
      const matchesPrice = gamePrice >= filters.minPrice && gamePrice <= filters.maxPrice;

      // 3. Filtro Género 
      const matchesGenre = filters.genres.length === 0 || 
                           gameGenres.some(g => filters.genres.includes(g));

      // 4. Filtro Consola
      const matchesPlatform = filters.platforms.length === 0 || 
                              gamePlatforms.some(p => filters.platforms.includes(p));

      return matchesSearch && matchesPrice && matchesGenre && matchesPlatform;
    });
  }, [search, filters, safeGames]);

  return (
    <Router>
      <Header 
        search={search} 
        setSearch={setSearch}
        cartCount={cartCount}
        filters={filters}
        setFilters={setFilters}
        availableGenres={allGenres}
        availablePlatforms={allPlatforms}
        favCount={favorites.length} 
      />
      <Toast message={toastMsg} isVisible={isToastVisible} />
      
      <Routes>
        <Route 
          path="/" 
          element={
            <Home 
              games={filteredGames} 
              onAdd={handleAddToCart} 
              toggleFavorite={handleToggleFavorite} 
              isFavorite={isFavorite} 
            />
          } 
        />

        <Route 
          path="/catalogo" 
          element={
            <Catalog 
              games={filteredGames} 
              addToCart={handleAddToCart} 
              toggleFavorite={handleToggleFavorite} 
              isFavorite={isFavorite} 
            />
          } 
        />

        <Route 
          path="/favorites" 
          element={
            <Favorites 
              favorites={favorites} 
              onAdd={handleAddToCart} 
              onRemove={(game) => toggleFavorite(game)} 
              onMove={moveFavorite}
            />
          } 
        />
       <Route 
          path="/cart" 
          element={
            <Cart 
              cart={cart} 
              addToCart={handleAddToCart}
              removeFromCart={removeFromCart} 
              deleteFromCart={deleteFromCart} 
              onCheckout={handleCheckout} 
              total={total} 
            />
          } 
        />
      </Routes>
    </Router>
  );
}
  
export default App;