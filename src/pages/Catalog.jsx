import React, { useState, useEffect } from 'react';
import GameCard from '../components/GameCard';
import './Catalog.css';

const Catalog = ({ games, addToCart, toggleFavorite, isFavorite, filters, setFilters }) => {  
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 9;

  // Reinicia la página actual cuando los juegos cambian
  useEffect(() => {
    setCurrentPage(1);
  }, [games]);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentGames = games.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(games.length / itemsPerPage);

  // Funciones de navegación
  const nextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
    window.scrollTo({ top: 0, behavior: 'smooth' }); 
  };

  const prevPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSortChange = (e) => {
    setFilters(prev => ({ ...prev, sortOrder: e.target.value }));
  };

 return (
    <div className="catalog">
      <h2 className="catalog__title">Catálogo Completo</h2>
      
      <div className="catalog__header">
        <p className="catalog__count">
          Mostrando {currentGames.length} de {games.length} resultados
        </p>

        <div className="catalog__sort">
          <label htmlFor="sort">Ordenar por: </label>
          <select 
            id="sort" 
            value={filters?.sortOrder || 'default'} 
            onChange={handleSortChange}
            className="sort-select"
          >
            <option value="default"> Destacados</option>
            <option value="az"> Nombre (A-Z)</option>
            <option value="za"> Nombre (Z-A)</option>
            <option value="lowHigh">Menor a Mayor Precio</option>
            <option value="highLow">Mayor a Menor Precio</option>
          </select>
        </div>
      </div>

      <div className="catalog__grid">
        {currentGames.length > 0 ? (
          currentGames.map((game) => (
            <GameCard 
              key={game.id} 
              game={game} 
              onAdd={addToCart} 
              toggleFavorite={toggleFavorite}
              isFavorite={isFavorite}
            />
          ))
        ) : (
          <div className="catalog__empty">
            <h3>No encontramos juegos. 😔</h3>
            <p>Prueba ajustando los filtros o la búsqueda.</p>
          </div>
        )}
      </div>

      {/*  Paginación*/}
      {totalPages > 1 && (
  <div className="catalog__pagination">
    <button 
      className="pagination-btn" 
      onClick={prevPage}
      style={{ visibility: currentPage === 1 ? 'hidden' : 'visible' }}
    >
      ← Anterior
    </button>

    <span className="pagination-info">
        {currentPage} / {totalPages}
    </span>

    <button 
      className="pagination-btn" 
      onClick={nextPage}
      style={{ visibility: currentPage >= totalPages ? 'hidden' : 'visible' }}
    >
      Siguiente →
    </button>
  </div>
)}
    </div>
  );
};

export default Catalog;