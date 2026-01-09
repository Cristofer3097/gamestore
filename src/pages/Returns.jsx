import React, { useState } from 'react';
import './Returns.css';
import { useAuth } from '../context/UserContext';
import { getMyOrders, getAllSaleDetails } from '../services/loginService';

// 1. Recibimos 'games' como prop
const Returns = ({ showToast }) => {
  const { user } = useAuth();
  const [selectedGameId, setSelectedGameId] = useState('');
  const [selectedPlatform, setSelectedPlatform] = useState('');
  const [purchasedGames, setPurchasedGames] = useState([]);

  // 2.Buscamos el juego seleccionado en la "base de datos"
  const safeGames = games || [];
  const selectedGame = purchasedGames.find(g => g.idVideojuegos === parseInt(selectedGameId));

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

  // filtramos la lista basándonos en el historial de compras
  useEffect(() => {
    if (user) {
      // Cargar historial para saber qué puede devolver
      const fetchData = async () => {
        const myOrders = await getMyOrders(user.token);
        const myOrderIds = myOrders.filter(o => o.usuario.idUsuario === user.idUsuario).map(o => o.idVenta);
        
        const allDetails = await getAllSaleDetails(user.token);
        // Filtramos detalles que pertenezcan a mis ventas
        const myItems = allDetails.filter(d => myOrderIds.includes(d.venta.idVenta));
        
        // Extraemos los juegos únicos
        const uniqueGames = [];
        const map = new Map();
        for (const item of myItems) {
            if(!map.has(item.producto.idVideojuegos)){
                map.set(item.producto.idVideojuegos, true);
                uniqueGames.push(item.producto);
            }
        }
        setPurchasedGames(uniqueGames);
      };
      fetchData();
    }
  }, [user]);

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
        {purchasedGames.map(game => (
            <option key={game.idVideojuegos} value={game.idVideojuegos}>
               {game.titulo}
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