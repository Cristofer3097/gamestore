import React from 'react';
import { Link } from 'react-router-dom';
import './Favorites.css';

const Favorites = ({ favorites, onAdd, onRemove, onMove }) => {
  
  if (favorites.length === 0) {
    return (
      <div className="favorites-empty">
        <h2>Tu lista de deseos está vacía 💔</h2>
        <p>Explora el catálogo para agregar juegos.</p>
        <Link to="/catalogo" className="back-btn">Ir al Catálogo</Link>
      </div>
    );
  }

  return (
    <div className="favorites-container">
      <h2 className="fav-title">Mi Lista de Deseos</h2>
      
      <div className="fav-list">
        {favorites.map((game, index) => (
          <div key={game.id} className="fav-item">
            
            {/* Columna 1: Prioridad y Controles */}
            <div className="fav-rank">
              <span className="rank-number">#{index + 1}</span>
              <div className="rank-controls">
                <button onClick={() => onMove(index, 'up')} disabled={index === 0}>▲</button>
                <button onClick={() => onMove(index, 'down')} disabled={index === favorites.length - 1}>▼</button>
              </div>
            </div>

            {/* Columna 2: Imagen */}
            <div className="fav-image">
              <img src={game.image} alt={game.title} />
            </div>

            {/* Columna 3: Información */}
            <div className="fav-info">
              <h3>{game.title}</h3>
              <p className="fav-meta">
                <strong>Consola:</strong> {Array.isArray(game.platforms) ? game.platforms.join(', ') : game.platforms}
              </p>
              <p className="fav-meta">
                <strong>Géneros:</strong> {Array.isArray(game.genres) ? game.genres.join(', ') : 'N/A'}
              </p>
              <span className="fav-price">${game.price}</span>
            </div>

            {/* Columna 4: Acciones */}
            <div className="fav-actions">
              <button className="fav-add-btn" onClick={() => onAdd(game)}>
                Agregar al Carrito
              </button>
              <button className="fav-remove-btn" onClick={() => onRemove(game)}>
                Eliminar
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Favorites;