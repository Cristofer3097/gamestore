import React, { useMemo } from 'react';
import './Recommended.css'; 

const Recommended = ({ onAdd, games }) => {
    const safeGames = games || [];

  // Obtener 4 juegos aleatorios
  const randomGames = useMemo(() => {
    return [...safeGames]
      .sort(() => 0.5 - Math.random())
      .slice(0, 5);
  }, []);

  return (
    <div className="recommended">
      <h3 className="recommended__title">Quizás te interese...</h3>
      <div className="recommended__grid">
        {randomGames.map(game => (
          <div key={game.id} className="rec-card">
            <img src={game.image} alt={game.title} className="rec-card__img" />
            <div className="rec-card__info">
              <p className="rec-card__title">{game.title}</p>
              <p className="rec-card__price">${game.price}</p>
              <button 
                className="rec-card__btn"
                onClick={() => onAdd(game)}
              >
                Agregar
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Recommended;