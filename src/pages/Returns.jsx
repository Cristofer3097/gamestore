import React, { useState } from 'react';
import { gamesMock } from '../data/games';
import './Returns.css';

const Returns = ({ showToast }) => {
  const [selectedGameId, setSelectedGameId] = useState('');
  const [selectedPlatform, setSelectedPlatform] = useState('');

  // Buscamos el juego seleccionado en la "base de datos"
  const selectedGame = gamesMock.find(g => g.id === parseInt(selectedGameId));

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!selectedGame || !selectedPlatform) {
        showToast("⚠️ Por favor selecciona un juego y una plataforma.");
        return;
    }

    // Lógica de simulación
    showToast(`🚚 Solicitud aprobada. La paquetería pasará a recoger tu pedido de ${selectedGame.title} pronto.`);
    
    // Resetear formulario
    setSelectedGameId('');
    setSelectedPlatform('');
  };

  return (
    <div className="returns-page">
      <div className="returns-container">
        <h2 className="returns-title">Centro de Devoluciones</h2>
        <p className="returns-subtitle">¿No estás satisfecho con tu compra? Solicita un reembolso aquí.</p>

        <form onSubmit={handleSubmit} className="returns-form">
          
          <div className="form-group">
            <label>Selecciona el videojuego:</label>
            <select 
              value={selectedGameId} 
              onChange={(e) => {
                setSelectedGameId(e.target.value);
                setSelectedPlatform(''); 
              }}
              className="returns-input"
            >
              <option value="">-- Selecciona un producto --</option>
              {gamesMock.map(game => (
                <option key={game.id} value={game.id}>
                  {game.title}
                </option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label>Plataforma / Versión:</label>
            <select 
              value={selectedPlatform} 
              onChange={(e) => setSelectedPlatform(e.target.value)}
              className="returns-input"
              disabled={!selectedGame} 
            >
              <option value="">-- Selecciona la versión --</option>
              {selectedGame && selectedGame.platforms.map(p => (
                <option key={p} value={p}>{p}</option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label>Monto de reembolso estimado:</label>
            <div className="price-display">
              {selectedGame ? `$${selectedGame.price}` : '$0.00'}
            </div>
          </div>

          <div className="security-note">
            <strong>📦 Nota importante:</strong> Envuelve el paquete en una caja asegurada antes de entregarlo al repartidor.
          </div>

          <button type="submit" className="returns-btn">
            Solicitar Devolución
          </button>
        </form>
      </div>
    </div>
  );
};

export default Returns;