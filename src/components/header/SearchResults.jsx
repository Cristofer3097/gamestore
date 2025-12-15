import React from 'react';
import { Link } from 'react-router-dom';
import './SearchResults.css';

const SearchResults = ({ results, onClose }) => {
  if (results.length === 0) return null;

  return (
    <div className="search-dropdown">
      {results.slice(0, 3).map((game) => (
        <Link 
          to={`/game/${game.id}`} 
          key={game.id} 
          className="search-item"
          onClick={onClose} 
        >

          <div className="search-item__img">
            <img src={game.image} alt={game.title} />
          </div>


          <div className="search-item__info">
            <h4 className="search-item__title">{game.title}</h4>
            <span className="search-item__meta">
              {Array.isArray(game.platforms) ? game.platforms.join(', ') : game.platforms}
            </span>
          </div>


          <div className="search-item__price">
            ${game.price}
          </div>
        </Link>
      ))}


      {results.length > 3 && (
        <Link to="/catalogo" className="search-view-filter" onClick={onClose}>
          Ver todos los resultados ({results.length})
        </Link>
      )}
    </div>
  );
};

export default SearchResults;