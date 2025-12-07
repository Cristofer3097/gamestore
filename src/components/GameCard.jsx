import React from 'react';
import './GameCard.css';

const GameCard = ({ game, onAdd, toggleFavorite, isFavorite }) => {
    const isFav = isFavorite ? isFavorite(game.id) : false

  return (
    <article className="producto">
      <button 
        className={`producto__fav-btn ${isFav ? 'producto__fav-btn--active' : ''}`}
        onClick={() => toggleFavorite && toggleFavorite(game)}
        title={isFav ? "Quitar de favoritos" : "Añadir a favoritos"}
      >
        {isFav ? '❤️' : '🤍'}
      </button>

      <img 
        src={game.image} 
        alt={game.title} 
        className="producto__imagen" 
      />

      <div className="producto__contenido">
        <h3 className="producto__titulo">{game.title}</h3>
        
        {game.platforms && (
           <p style={{ fontSize: '0.8rem', color: '#aaa', margin: '0 0 10px' }}>
             {Array.isArray(game.platforms) ? game.platforms.join(', ') : game.platforms}
           </p>
        )}

        <div className="producto__footer">
          <span className="producto__precio">${game.price}</span>
          
          <button 
            className="producto__btn"
            onClick={() => onAdd(game)}
          >
            Añadir al Carrito
          </button>
        </div>
      </div>
    </article>
  );
};

export default GameCard;