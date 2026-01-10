import React, { useState, useEffect } from 'react';
import './Returns.css';
import { useAuth } from '../context/UserContext';
import { getMyOrders, getAllSaleDetails } from '../services/loginService';

// Componente de Devoluciones
const Returns = ({ showToast }) => {
  const { user } = useAuth();
  const [selectedGameId, setSelectedGameId] = useState('');
  const [purchasedGames, setPurchasedGames] = useState([]);


  // filtramos la lista basándonos en el historial de compras
  useEffect(() => {
    if (user) {
      const fetchData = async () => {
        try {
          const myOrders = await getMyOrders(user.token);
          const allDetails = await getAllSaleDetails(user.token);
          
          // Filtrar mis compras
          const myOrderIds = myOrders.filter(o => o.usuario.idUsuario === user.idUsuario).map(o => o.idVenta);
          const myItems = allDetails.filter(d => myOrderIds.includes(d.venta.idVenta));
          
          // Preparar lista para el select (Guardamos también el ID de venta para saber cuál reembolsar)
          const uniqueGames = myItems.map(item => ({
             ...item.producto, 
             saleId: item.venta.idVenta 
          }));
          
          if (uniqueGames.length === 0) {
             setPurchasedGames([
                 { idVideojuegos: 999, titulo: "Juego Simulado (Prueba)", price: 59.99, saleId: 9999 }
             ]);
          } else {
             setPurchasedGames(uniqueGames);
          }
        } catch (error) {
          console.error("Error cargando historial", error);
        }
      };
      fetchData();
    }
  }, [user]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!selectedGameId) {
        showToast("⚠️ Por favor selecciona un producto.");
        return;
    }

    const gameToReturn = purchasedGames.find(g => g.idVideojuegos === parseInt(selectedGameId));

    // --- SIMULACIÓN DE REEMBOLSO ---

    const refundedList = JSON.parse(localStorage.getItem('refunded_orders') || '[]');
    refundedList.push(gameToReturn.saleId);
    localStorage.setItem('refunded_orders', JSON.stringify(refundedList));

    // Mensaje solicitado por la actividad
    showToast(`🚚 Solicitud recibida. La paquetería pasará a recoger tu pedido de "${gameToReturn.titulo}" pronto.`);
    
    setSelectedGameId('');
  };

  return (
    <div className="returns-page">
      <div className="returns-container">
        <h2 className="returns-title">Centro de Devoluciones</h2>
        <p className="returns-subtitle">Selecciona el producto que deseas devolver.</p>

        <form onSubmit={handleSubmit} className="returns-form">
          <div className="form-group">
            <label>Producto a devolver:</label>
            <select 
              value={selectedGameId} 
              onChange={(e) => setSelectedGameId(e.target.value)}
              className="returns-input"
            >
              <option value="">-- Selecciona de tus compras --</option>
              {purchasedGames.map((game, index) => (
                <option key={`${game.idVideojuegos}-${index}`} value={game.idVideojuegos}>
                   {game.titulo} (Orden #{game.saleId})
                </option>
              ))}
            </select>
          </div>

          <div className="security-note">
            <strong>📦 Nota importante:</strong> Envuelve el paquete en una caja asegurada antes de entregarlo al repartidor.
          </div>

          <button type="submit" className="returns-btn">
            Solicitar Reembolso
          </button>
        </form>
      </div>
    </div>
  );
};

export default Returns;