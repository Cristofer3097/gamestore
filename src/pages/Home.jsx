import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css'; 

const Home = () => {
  return (
    <div className="home">
      <section className="home__hero">
        <div className="home__content">
          <h1 className="home__title">Bienvenido a GameStore</h1>
          <p className="home__subtitle">
            Explora los mejores títulos para todas las consolas a precios increíbles.
          </p>
          <Link to="/catalogo" className="home__cta-button">
            Ver Catálogo
          </Link>
        </div>
      </section>
      
      <section className="home__featured">
        <h2 className="home__section-title">Novedades Destacadas</h2>
        <p>Visita nuestro catálogo para ver las últimas llegadas.</p>
      </section>
    </div>
  );
};

export default Home;