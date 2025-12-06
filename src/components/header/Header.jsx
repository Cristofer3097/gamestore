import React, { useState } from 'react';
import { useLocation, Link } from 'react-router-dom';
import FilterMenu from './FilterMenu';
import './Header.css';

const Header = ({ search, setSearch, filters, setFilters, availableGenres, availablePlatforms, cartCount }) => {
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
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" 
                stroke-width="2" stroke-linecap="round" stroke-linejoin="round" 
                class="icon icon-tabler icons-tabler-outline icon-tabler-baseline-density-medium">
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
          <Link to="/cart" className="header-cart">
            🛒 <span>{cartCount}</span>
          </Link>
        </div>
      </header>
    </>
  );
};

export default Header;