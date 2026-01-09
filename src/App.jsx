import React, { useState, useMemo, useRef, useEffect } from 'react'; 
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { getAllGames } from './services/gameService';
import { useCart } from './hooks/useCart';
import Header from './components/header/Header';
import Home from './pages/Home'; 
import Cart from './pages/Cart';
import Catalog from './pages/Catalog';
import Returns from './pages/Returns';
import GameDescription from './pages/GameDescription';
import { useFavorites } from './hooks/useFavorites';
import Favorites from './pages/Favorites';
import Toast from './components/Toast';
import Footer from './components/Footer';
import { AuthProvider } from './context/UserContext';
import Login from './pages/Login';
import Orders from './pages/Orders';

function App() {
const { cart, addToCart, removeFromCart, deleteFromCart, clearCart, updatePlatform, total, cartCount } = useCart();
  const { favorites, toggleFavorite, isFavorite, moveFavorite } = useFavorites();

  // ESTADO PARA LOS JUEGOS DE LA BASE DE DATOS
  const [dbGames, setDbGames] = useState([]); 

  // CARGAR DATOS DEL BACKEND AL INICIAR
  useEffect(() => {
    const fetchGames = async () => {
      const games = await getAllGames();
      setDbGames(games);
    };
    fetchGames();
  }, []);

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

  const handleReturnToast = (message) => {
    showToast(message);
  };
  
  // Filtros y Búsqueda
  const [search, setSearch] = useState("");
  const [filters, setFilters] = useState({
    minPrice: 0,
    maxPrice: 200, 
    genres: [],
    platforms: [],
    sortOrder: 'default'
  });

  const safeGames = dbGames || [];
  const allGenres = [...new Set(safeGames.flatMap(g => g.genres || []))];
  const allPlatforms = [...new Set(safeGames.flatMap(g => g.platforms || []))];


  const filteredGames = useMemo(() => {
    let result = safeGames.filter(game => {
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

      return (
      gameTitle.includes(searchTerm) &&
      (gamePrice >= filters.minPrice && gamePrice <= filters.maxPrice) &&
      (filters.genres.length === 0 || gameGenres.some(g => filters.genres.includes(g))) &&
      (filters.platforms.length === 0 || gamePlatforms.some(p => filters.platforms.includes(p)))
    );
  });

  // 3. APLICAR ORDENAMIENTO (NUEVO BLOQUE)
  switch (filters.sortOrder) {
    case 'az':
      result.sort((a, b) => a.title.localeCompare(b.title));
      break;
    case 'za':
      result.sort((a, b) => b.title.localeCompare(a.title));
      break;
    case 'lowHigh':
      result.sort((a, b) => a.price - b.price);
      break;
    case 'highLow':
      result.sort((a, b) => b.price - a.price);
      break;
    default: // 'default' = Destacados (por ID)
      result.sort((a, b) => a.id - b.id);
      break;
  }

  return result;
}, [search, filters, safeGames]);

  return (
    <AuthProvider>
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
        allGames={safeGames} 
      />
      <Toast message={toastMsg} isVisible={isToastVisible} />
      <div style={{ minHeight: '80vh' }}>
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
              filters={filters}      
              setFilters={setFilters}
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
        <Route path="/login" element={<Login />} />
            <Route path="/orders" element={<Orders />} />
        <Route 
          path="/game/:id" 
          element={
            <GameDescription 
              games={safeGames}
              onAdd={handleAddToCart} 
              toggleFavorite={handleToggleFavorite}
              isFavorite={isFavorite}
            />
          } 
        />

        <Route 
  path="/returns" 
  element={
    <Returns 
      showToast={handleReturnToast} 
      games={safeGames}
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
              updatePlatform={updatePlatform}
              onCheckout={handleCheckout} 
              total={total} 
              games={safeGames}
            />
          } 
        />
      </Routes>


      </div>

      <Footer />
    </Router>
    </AuthProvider>
  );
}
  
export default App;