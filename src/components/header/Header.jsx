import React, { useState } from 'react';
import { useLocation, Link } from 'react-router-dom';
import FilterMenu from './FilterMenu';
import './Header.css';

const Header = ({ search, setSearch, filters, setFilters, availableGenres, availablePlatforms, cartCount, favCount }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  
  const showFilterBtn = location.pathname === '/' || location.pathname === '/catalogo';

  return (
    <>
      {isMenuOpen && (
        <div 
          className="page-overlay" 
          onClick={() => setIsMenuOpen(false)} 
        />
      )}

      <header className="header">
        <div className="header-left" a="/">
          
          {/* BOTÓN DE FILTRO  */}
          {showFilterBtn && (
            <div className="filter-container">
              <button 
                className={`filter-toggle-btn ${isMenuOpen ? 'active' : ''}`}
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                title="Filtros"
              >
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  width="24" 
                  height="24" 
                  viewBox="0 0 24 24" 
                  fill="none" 
                  stroke="currentColor" 
                  strokeWidth="2"       
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  className="icon icon-tabler icons-tabler-outline icon-tabler-baseline-density-medium" 
                >
              <path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M4 20h16" /><path d="M4 12h16" /><path d="M4 4h16" />
                </svg>
              </button>
              
              {/* MENÚ DESPLEGABLE */}
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

          <div className="logo" >
            <Link to="/catalogo" className="header-logo">
            GAME STORE</Link>
            </div>
          
        </div>

        <div className="header-center">
          <input 
            type="text" 
            placeholder="Buscar juegos..." 
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="header-search"
          />
        </div>

        <div className="header-right">
          <Link to="/favorites" className="header-icon-link" title="Mis Favoritos">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor" 
            className="icon icon-tabler icons-tabler-filled icon-tabler-heart">
              <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
            <path d="M6.979 3.074a6 6 0 0 1 4.988 1.425l.037 .033l.034 -.03a6 6 0 0 1 4.733 -1.44l.246 .036a6 6 0 0 1 3.364 10.008l-.18 .185l-.048 .041l-7.45 7.379a1 1 0 0 1 -1.313 .082l-.094 -.082l-7.493 -7.422a6 6 0 0 1 3.176 -10.215z" />
            </svg> <span>{favCount}</span>
          </Link>
          <Link to="/cart" className="header-cart">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" 
            stroke="currentColor" 
            strokeWidth="2" 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            className="icon icon-tabler icons-tabler-outline icon-tabler-shopping-cart">
              <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
              <path d="M6 19m-2 0a2 2 0 1 0 4 0a2 2 0 1 0 -4 0" />
              <path d="M17 19m-2 0a2 2 0 1 0 4 0a2 2 0 1 0 -4 0" />
            <path d="M17 17h-11v-14h-2" /><path d="M6 5l14 1l-1 7h-13" /></svg> <span>{cartCount}</span>
          </Link>
        </div>
      </header>
    </>
  );
};

export default Header;