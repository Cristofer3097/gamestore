import React, { useState, useEffect } from 'react';
import './Returns.css';
import { useAuth } from '../context/UserContext';
import { getMyOrders, getOrderDetails } from '../services/loginService';

const Returns = ({ showToast }) => {
  const { user } = useAuth();
  const [selectedUniqueKey, setSelectedUniqueKey] = useState('');
  const [purchasedGames, setPurchasedGames] = useState([]);

  const getOrderId = (order) => order.idVenta || order.id_venta;
  
  const getProductData = (item) => {
    const prod = item.producto || {};
    return {
      id: prod.idVideojuegos || prod.id_videojuegos || item.id_videojuego,
      titulo: prod.titulo || "Producto sin nombre"
    };
  };

  useEffect(() => {
    if (user && user.idUsuario) {
      const fetchData = async () => {
        try {
          const myOrders = await getMyOrders(user.idUsuario, user.token);
          
          if(!Array.isArray(myOrders)) return;

          const detailsPromises = myOrders.map(order => {
             const saleId = getOrderId(order);
             if (!saleId) return Promise.resolve([]);

             return getOrderDetails(saleId, user.token)
               .then(items => items.map(item => ({ ...item, saleId })));
          });

          const results = await Promise.all(detailsPromises);
          const allMyItems = results.flat();

          const gamesList = allMyItems.map(item => {
             const productData = getProductData(item);
             return {
               idVideojuegos: productData.id,
               titulo: productData.titulo,
               saleId: item.saleId,
               uniqueKey: `${productData.id}-${item.saleId}` 
             };
          });
          
          const validGames = gamesList.filter(g => g.idVideojuegos);
          setPurchasedGames(validGames);

        } catch (error) {
          console.error("Error cargando compras:", error);
        }
      };
      fetchData();
    }
  }, [user]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!selectedUniqueKey) return;
    
    // Buscamos por la llave única, así no confundimos pedidos
    const gameToReturn = purchasedGames.find(g => g.uniqueKey === selectedUniqueKey);
    
    if (gameToReturn) {
        // 1. Guardar en LocalStorage para que Orders.jsx lo detecte
        const currentRefunds = JSON.parse(localStorage.getItem('refunded_orders') || '[]');
        if (!currentRefunds.includes(gameToReturn.saleId)) {
            currentRefunds.push(gameToReturn.saleId);
            localStorage.setItem('refunded_orders', JSON.stringify(currentRefunds));
        }

        // 2. Mostrar mensaje
        if (showToast) {
            showToast(`🚚 Reembolso procesado para: ${gameToReturn.titulo} (Orden #${gameToReturn.saleId})`);
        } else {
            alert(`Reembolso procesado para: ${gameToReturn.titulo}`);
        }
    }
    
    setSelectedUniqueKey('');
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
              // Usamos la llave única como valor
              value={selectedUniqueKey} 
              onChange={(e) => setSelectedUniqueKey(e.target.value)}
              className="returns-input"
            >
              <option value="">-- Selecciona de tus compras --</option>
              {purchasedGames.map((game) => (
                // La llave única distingue el mismo juego en diferentes pedidos
                <option key={game.uniqueKey} value={game.uniqueKey}>
                   {game.titulo} (Orden #{game.saleId})
                </option>
              ))}
            </select>
          </div>

          <div className="security-note">
            <strong>📦 Nota:</strong> Asegúrate de que el producto esté en buen estado.
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