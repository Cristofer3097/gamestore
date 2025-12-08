import React from 'react';
import { Link } from 'react-router-dom';
import GameCard from '../components/GameCard'; 
import './Home.css'; 

const Home = ({ games, onAdd, toggleFavorite, isFavorite }) => {
  
  const featuredGames = games ? games.slice(0, 3) : [];

  return (
    <div className="home">
      
      <section className="home__hero">
        <div className="hero-overlay">
          <div className="home__content">
            <h1 className="home__title">
              Sube de Nivel <br />
              <span className="highlight-text">Tu Experiencia</span>
            </h1>
            <p className="home__subtitle">
              Los mejores títulos para PS5, Xbox, Switch y PC al mejor precio.
            </p>
            <Link to="/catalogo" className="home__cta-button">
              Explorar Catálogo 🚀
            </Link>
          </div>
        </div>
      </section>
      
      <section className="home__benefits">
        <div className="benefit-item">
          <span className="benefit-icon">🚚</span>
          <h3>Envío Rápido</h3>
          <p>Recibe tus juegos en 24h</p>
        </div>
        <div className="benefit-item">
          <span className="benefit-icon">🛡️</span>
          <h3>Compra Segura</h3>
          <p>Protección al comprador</p>
        </div>
        <div className="benefit-item">
          <span className="benefit-icon">🎮</span>
          <h3>Variedad</h3>
          <p>Cientos de títulos</p>
        </div>
      </section>

      <section className="home__featured">
        <h2 className="section-title">Novedades Destacadas 🔥</h2>
        <p className="section-subtitle">No te pierdas los últimos lanzamientos</p>
        
        <div className="featured-grid">
          {featuredGames.map(game => (
            <GameCard 
              key={game.id} 
              game={game} 
              onAdd={onAdd}
              toggleFavorite={toggleFavorite}
              isFavorite={isFavorite}
            />
          ))}
        </div>

        <div className="view-more-container">
          <Link to="/catalogo" className="view-more-btn">Ver todo el catálogo</Link>
        </div>
      </section>

    </div>
  );
};

export default Home;