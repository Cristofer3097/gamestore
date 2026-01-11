import React, { useState, useEffect, useRef } from 'react';
import { useLocation, Link } from 'react-router-dom';
import FilterMenu from './FilterMenu';
import './Header.css';
import SearchResults from './SearchResults';
import { useAuth } from "../../context/UserContext";

const Header = ({ search, setSearch, filters, setFilters, availableGenres, availablePlatforms, cartCount, favCount, allGames }) => {
  const { user, logout } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const searchRef = useRef(null);
  const location = useLocation();
  const showFilterBtn = location.pathname === '/catalogo';

  const foundGames = search.length > 0 
    ? allGames.filter(g => g.title.toLowerCase().includes(search.toLowerCase())) 
    : [];

  // Cerrar resultados de búsqueda al hacer clic fuera
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setShowResults(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <>
      {isMenuOpen && (
        <div 
          className="page-overlay" 
          onClick={() => setIsMenuOpen(false)} 
        />
      )}

      <header className="header">
        {/* IZQUIERDA: Filtro y Logo */}
        <div className="header-left">
          
          {/* BOTÓN DE FILTRO */}
          {showFilterBtn && (
            <div className="filter-container">
               <button 
                className={`filter-toggle-btn ${isMenuOpen ? 'active' : ''}`}
                onClick={() => setIsMenuOpen(!isMenuOpen)}
               >
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-baseline-density-medium">
                  <path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M4 20h16" /><path d="M4 12h16" /><path d="M4 4h16" />
                </svg>
              </button>
              
              <FilterMenu 
                isOpen={isMenuOpen}
                onClose={() => setIsMenuOpen(false)}
                filters={filters}
                setFilters={setFilters}
                uniqueGenres={availableGenres}
                uniquePlatforms={availablePlatforms}
              />
            </div>
          )}

          <div className="logo">
            <Link to="/" className="header-logo-container">
              <svg xmlns="http://www.w3.org/2000/svg" className="logo-icon" width="32" height="32" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
                <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                <path d="M2 6m0 2a2 2 0 0 1 2 -2h16a2 2 0 0 1 2 2v8a2 2 0 0 1 -2 2h-16a2 2 0 0 1 -2 -2z" />
                <path d="M6 12h4m-2 -2v4" />
                <path d="M15 11l0 .01" />
                <path d="M18 13l0 .01" />
              </svg>
              <span className="logo-text">GAME <span className="logo-accent">STORE</span></span>
            </Link>
          </div>
        </div>

        {/* CENTRO: Buscador */}
        <div className="header-center">
          <div className="search-wrapper" ref={searchRef}>
            <input 
              type="text" 
              placeholder="Buscar juegos..." 
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setShowResults(true); 
              }}
              onFocus={() => setShowResults(true)} 
              className="header-search"
            />
            {search.length > 0 && showResults && (
               <SearchResults 
                  results={foundGames} 
                  onClose={() => setShowResults(false)} 
               />
            )}
          </div>
        </div>

        {/* DERECHA: Iconos y Usuario */}
        <div className="header-right">
          <Link to="/favorites" className="header-icon-link" title="Mis Favoritos">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor" className="icon icon-tabler icons-tabler-filled icon-tabler-heart">
              <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
              <path d="M6.979 3.074a6 6 0 0 1 4.988 1.425l.037 .033l.034 -.03a6 6 0 0 1 4.733 -1.44l.246 .036a6 6 0 0 1 3.364 10.008l-.18 .185l-.048 .041l-7.45 7.379a1 1 0 0 1 -1.313 .082l-.094 -.082l-7.493 -7.422a6 6 0 0 1 3.176 -10.215z" />
            </svg> <span>{favCount}</span>
          </Link>
          
          <Link to="/cart" className="header-cart">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-shopping-cart">
              <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
              <path d="M6 19m-2 0a2 2 0 1 0 4 0a2 2 0 1 0 -4 0" />
              <path d="M17 19m-2 0a2 2 0 1 0 4 0a2 2 0 1 0 -4 0" />
              <path d="M17 17h-11v-14h-2" /><path d="M6 5l14 1l-1 7h-13" />
            </svg> <span>{cartCount}</span>
          </Link>

          {/* Menú de Usuario optimizado con clases CSS */}
          <div className="user-menu">
            <Link to={user ? "/orders" : "/login"} className="user-link">
               <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-user">
                 <path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M8 7a4 4 0 1 0 8 0a4 4 0 0 0 -8 0" /><path d="M6 21v-2a4 4 0 0 1 4 -4h4a4 4 0 0 1 4 4v2" />
               </svg>
               <span>{user ? `Hola, ${user.nombre}` : "Iniciar Sesión"}</span>
            </Link>
            
            {user && (
              <button onClick={logout} className="logout-btn">
                (Salir)
              </button>
            )}
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;