import React from 'react';
import './GameCard.css';

const GameCard = ({ game, onAdd }) => {
  return (
    <article className="game-card">
      <div className="game-card__image-container">
        <img 
          src={game.image} 
          alt={game.title} 
          className="game-card__image" 
        />
      </div>
      <div className="game-card__content">
        <h3 className="game-card__title">{game.title}</h3>
        <p className="game-card__platform">{game.platform}</p>
        <div className="game-card__footer">
          <span className="game-card__price">${game.price}</span>
          <button 
            className="game-card__button game-card__button--primary"
            onClick={() => onAdd(game)}
          >
            Añadir
          </button>
        </div>
      </div>
    </article>
  );
};

export default GameCard;