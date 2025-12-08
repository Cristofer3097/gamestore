import React from 'react';
import './GameCard.css';
import { useNavigate } from 'react-router-dom';

const GameCard = ({ game, onAdd, toggleFavorite, isFavorite }) => {

  const navigate = useNavigate();
  const isFav = isFavorite ? isFavorite(game.id) : false

  const handleCardClick = () => {
    navigate(`/game/${game.id}`);
  };

  const stopPropagation = (e) => {
    e.stopPropagation();
  };

  return (
    <article className="producto" onClick={handleCardClick} style={{cursor: 'pointer'}}>
      <button 
        className={`producto__fav-btn ${isFav ? 'producto__fav-btn--active' : ''}`}
        onClick={(e) => {
          stopPropagation(e); 
          toggleFavorite && toggleFavorite(game);
        }}
        title={isFav ? "Quitar de favoritos" : "Añadir a favoritos"}
      >
        {isFav ? 
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor" 
        className="icon icon-tabler icons-tabler-filled icon-tabler-heart"><path stroke="none" d="M0 0h24v24H0z" fill="none"/>
        <path d="M6.979 3.074a6 6 0 0 1 4.988 1.425l.037 .033l.034 -.03a6 6 0 0 1 4.733 -1.44l.246 .036a6 6 0 0 1 3.364 10.008l-.18 .185l-.048 .041l-7.45 7.379a1 1 0 0 1 -1.313 .082l-.094 -.082l-7.493 -7.422a6 6 0 0 1 3.176 -10.215z" />
        </svg>
        : 
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" 
        strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-heart">
          <path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M19.5 12.572l-7.5 7.428l-7.5 -7.428a5 5 0 1 1 7.5 -6.566a5 5 0 1 1 7.5 6.572" />
        </svg> 
        }
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
            onClick={() => {
              stopPropagation(e);
              onAdd(game);
            }}
          >
            Añadir al Carrito
          </button>
        </div>
      </div>
    </article>
  );
};

export default GameCard;