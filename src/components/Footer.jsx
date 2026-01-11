import React from 'react';
import { Link } from 'react-router-dom';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        
        <div className="footer-top">
          <div className="footer-brand">
            <div className="footer-logo-container">
              <svg xmlns="http://www.w3.org/2000/svg" className="logo-icon" width="32" height="32" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
                <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                <path d="M2 6m0 2a2 2 0 0 1 2 -2h16a2 2 0 0 1 2 2v8a2 2 0 0 1 -2 2h-16a2 2 0 0 1 -2 -2z" />
                <path d="M6 12h4m-2 -2v4" />
                <path d="M15 11l0 .01" />
                <path d="M18 13l0 .01" />
              </svg>
              <span className="footer-logo-text">GAME <span className="logo-accent">STORE</span></span>
            </div>
            <p className="brand-slogan">Tu tienda de videojuegos favorita.</p>
          </div>

          <nav className="footer-nav">
            <Link to="/" className="footer-link">Inicio</Link>
            <Link to="/catalogo" className="footer-link">Catálogo</Link>
            <Link to="/cart" className="footer-link">Carrito</Link>
            <Link to="/orders" className="footer-link">Pedidos</Link>
            <Link to="/favorites" className="footer-link">Deseados</Link>
            <Link to="/returns" className="footer-link highlight">Devoluciones</Link>
          </nav>
        </div>

        <hr className="footer-divider" />

        <div className="footer-bottom">
          <p>&copy; 2025 Pagina creada por el Equipo E 040</p>

          
            
            <p className="tech-info">
              Pagina creada en React
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-brand-react-native" style={{marginLeft: '5px', verticalAlign: 'text-bottom'}}>
                <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                <path d="M6.357 9c-2.637 .68 -4.357 1.845 -4.357 3.175c0 2.107 4.405 3.825 9.85 3.825c.74 0 1.26 -.039 1.95 -.097" />
                <path d="M9.837 15.9c-.413 -.596 -.806 -1.133 -1.18 -1.8c-2.751 -4.9 -3.488 -9.77 -1.63 -10.873c1.15 -.697 3.047 .253 4.974 2.254" />
                <path d="M6.429 15.387c-.702 2.688 -.56 4.716 .56 5.395c1.783 1.08 5.387 -1.958 8.043 -6.804c.36 -.67 .683 -1.329 .968 -1.978" />
                <path d="M12 18.52c1.928 2 3.817 2.95 4.978 2.253c1.85 -1.102 1.121 -5.972 -1.633 -10.873c-.384 -.677 -.777 -1.204 -1.18 -1.8" />
                <path d="M17.66 15c2.612 -.687 4.34 -1.85 4.34 -3.176c0 -2.11 -4.408 -3.824 -9.845 -3.824c-.747 0 -1.266 .029 -1.955 .087" />
                <path d="M8 12c.285 -.66 .607 -1.308 .968 -1.978c2.647 -4.844 6.253 -7.89 8.046 -6.801c1.11 .679 1.262 2.706 .56 5.393" />
                <path d="M12.26 12.015h-.01c-.01 .13 -.12 .24 -.26 .24a.263 .263 0 0 1 -.25 -.26c0 -.14 .11 -.25 .24 -.25h-.01c.13 -.01 .25 .11 .25 .24" />
              </svg>
            </p>

            <div className="footer-right-section">
            
            <div className="footer-socials">
              <a href="https://github.com/Cristofer3097/gamestore" className="social-icon" style={{display:'flex', alignItems:'center', gap:'5px'}}>
                GitHub
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-brand-github">
                    <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                    <path d="M9 19c-4.3 1.4 -4.3 -2.5 -6 -3m12 5v-3.5c0 -1 .1 -1.4 -.5 -2c2.8 -.3 5.5 -1.4 5.5 -6a4.6 4.6 0 0 0 -1.3 -3.2a4.2 4.2 0 0 0 -.1 -3.2s-1.1 -.3 -3.5 1.3a12.3 12.3 0 0 0 -6.2 0c-2.4 -1.6 -3.5 -1.3 -3.5 -1.3a4.2 4.2 0 0 0 -.1 3.2a4.6 4.6 0 0 0 -1.3 3.2c0 4.6 2.7 5.7 5.5 6c-.6 .6 -.6 1.2 -.5 2v3.5" />
                </svg>
              </a>
            </div>

          </div>
        </div>

      </div>
    </footer>
  );
};

export default Footer;