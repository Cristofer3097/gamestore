import React from 'react';
import GameCard from '../components/GameCard';
import './Catalog.css';

const Catalog = ({ games, addToCart, toggleFavorite, isFavorite }) => {  
  return (
    <div className="catalog">
      <h2 className="catalog__title">Catálogo Completo</h2>
      
      <p className="catalog__count">Mostrando {games.length} juegos</p>

      <div className="catalog__grid">
        {games.length > 0 ? (
          games.map((game) => (
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
    </div>
  );
};

export default Catalog;