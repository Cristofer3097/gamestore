import React, { useState, useEffect } from 'react';
import './Returns.css';
import { useAuth } from '../context/UserContext';
import { getMyOrders, getOrderDetails, createReturn } from '../services/loginService';

const Returns = ({ showToast }) => {
  const { user } = useAuth();
  const [selectedSaleId, setSelectedSaleId] = useState('');
  const [uniqueOrders, setUniqueOrders] = useState([]);

  // Función para obtener el ID de la orden
  const getOrderId = (order) => order.idVenta || order.id_venta;

  useEffect(() => {
    if (user && user.idUsuario) {
      const fetchData = async () => {
        try {
          const myOrders = await getMyOrders(user.idUsuario, user.token);
          
          if(!Array.isArray(myOrders)) return;

          // Filtramos para tener solo pedidos únicos y validos
          const cleanOrders = myOrders
            .map(order => {
                const id = getOrderId(order);
                return {
                    saleId: id,
                    date: order.fechaVenta || order.fecha_venta,
                    total: order.total
                };
            })
            .filter(order => order.saleId); 

          const unique = [...new Map(cleanOrders.map(item => [item.saleId, item])).values()];
          
          // Ordenar: Recientes primero
          unique.sort((a, b) => new Date(b.date) - new Date(a.date));

          setUniqueOrders(unique);

        } catch (error) {
          console.error("Error cargando compras:", error);
        }
      };
      fetchData();
    }
  }, [user]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedSaleId) return;
    
    try {
        // 1. Preparar datos
        const returnData = {
            idUsuario: user.idUsuario,
            saleId: selectedSaleId, 
            motivo: `Devolución del Pedido #${selectedSaleId}` 
        };

        // 2. ENVIAR AL BACKEND
        await createReturn(returnData, user.token);

        const currentRefunds = JSON.parse(localStorage.getItem('refunded_orders') || '[]');
        
        // Guardamos el ID DEL PEDIDO 
        const saleIdString = String(selectedSaleId);
        
        if (!currentRefunds.includes(saleIdString)) {
            currentRefunds.push(saleIdString);
            localStorage.setItem('refunded_orders', JSON.stringify(currentRefunds));
        }

        if (showToast) {
            showToast(`🚚 Devolución procesada para el pedido #${selectedSaleId}`);
        } else {
            alert(`Devolución registrada correctamente.`);
        }

        setSelectedSaleId('');

    } catch (error) {
        console.error("Error al procesar devolución:", error);
        alert("Hubo un error al conectar con el servidor. Revisa la consola.");
    }
  };

  return (
    <div className="returns-page">
      <div className="returns-container">
        <h2 className="returns-title">Centro de Devoluciones</h2>
        <form onSubmit={handleSubmit} className="returns-form">
          <div className="form-group">
            <label>Selecciona el pedido a devolver:</label>
            <select 
              value={selectedSaleId} 
              onChange={(e) => setSelectedSaleId(e.target.value)}
              className="returns-input"
            >
              <option value="">-- Mis Compras --</option>
              {uniqueOrders.map((order) => (
                <option key={order.saleId} value={order.saleId}>
                   Pedido #{order.saleId} - ${order.total}
                </option>
              ))}
            </select>
          </div>

          <button type="submit" className="returns-btn">
            Confirmar Reembolso
          </button>
        </form>
      </div>
    </div>
  );
};

export default Returns;