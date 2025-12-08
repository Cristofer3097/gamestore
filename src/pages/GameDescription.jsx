import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { gamesMock } from '../data/games';
import './GameDescription.css';

const GameDescription = ({ onAdd, toggleFavorite, isFavorite }) => {
  const { id } = useParams(); 
  const navigate = useNavigate();
  
  const game = gamesMock.find(g => g.id === parseInt(id));

  if (!game) {
    return <div style={{color:'white', padding:'50px', textAlign:'center'}}>Juego no encontrado 😕</div>;
  }

  const isFav = isFavorite ? isFavorite(game.id) : false;

  return (
    <div className="description-page">
      <button className="back-btn" onClick={() => navigate(-1)}>← Volver</button>

      <div className="desc-container">
        <div className="desc-image-box">
          <img src={game.image} alt={game.title} />
        </div>

        <div className="desc-info">
          <h1 className="desc-title">{game.title}</h1>
          
          <div className="desc-price-row">
             <span className="desc-price">${game.price}</span>
             <button 
                className={`desc-fav-btn ${isFav ? 'active' : ''}`} 
                onClick={() => toggleFavorite(game)}
                title="Añadir a deseados"
             >
                <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill={isFav ? "currentColor" : "none"} stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                  <path d="M19.5 12.572l-7.5 7.428l-7.5 -7.428a5 5 0 1 1 7.5 -6.566a5 5 0 1 1 7.5 6.572" />
                </svg>
             </button>
          </div>

          <p className="desc-text">
            {game.description || "Sin descripción disponible."}
          </p>

          <div className="desc-meta">
            <p><strong>Plataformas:</strong> {game.platforms.join(', ')}</p>
            <p><strong>Géneros:</strong> {game.genres.join(', ')}</p>
          </div>

          <button className="desc-add-btn" onClick={() => onAdd(game)}>
            Añadir al Carrito 🛒
          </button>
        </div>
      </div>
    </div>
  );
};

export default GameDescription;