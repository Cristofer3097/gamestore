// App.jsx
import React, { useState, useMemo } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { gamesMock } from './data/games';
import { useCart } from './hooks/useCart';
import Header from './components/header/Header';
import Home from './pages/Home'; 
import Cart from './pages/Cart';
import Catalog from './pages/Catalog';

function App() {
  const { cart, addToCart, removeFromCart, deleteFromCart, total, cartCount } = useCart();
  
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
      />
      
      <Routes>
        <Route 
          path="/" 
          element={<Home games={filteredGames} onAdd={addToCart} />} 
        />

        <Route 
          path="/catalogo" 
          element={<Catalog games={filteredGames} addToCart={addToCart} />} 
        />

        <Route 
          path="/cart" 
          element={<Cart cart={cart} addToCart={addToCart} removeFromCart={removeFromCart} deleteFromCart={deleteFromCart} total={total} />} 
        />
      </Routes>
    </Router>
  );
}
  
export default App;