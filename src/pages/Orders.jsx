import React, { useEffect, useState } from 'react';
import { useAuth } from '../context/UserContext';
import { getMyOrders, getAllSaleDetails } from '../services/loginService';
import './Orders.css'; 

const Orders = () => {
  const { user } = useAuth();
  const [orders, setOrders] = useState([]);
  const [details, setDetails] = useState([]);

  useEffect(() => {
    if (user) {
      // Cargar ventas
      getMyOrders(user.token).then(allSales => {
        // Filtrar solo las de este usuario
        const mySales = allSales.filter(s => s.usuario.idUsuario === user.idUsuario);
        setOrders(mySales);
      });

      // Cargar detalles para saber qué juegos son
      getAllSaleDetails(user.token).then(setDetails);
    }
  }, [user]);

  // Función auxiliar para encontrar juegos de una venta
  const getGamesForSale = (saleId) => {
    return details.filter(d => d.venta.idVenta === saleId);
  };

  if (!user) return <div style={{padding: '50px', textAlign: 'center', color: 'white'}}>Inicia sesión para ver tus órdenes.</div>;

  return (
    <div className="orders-page" style={{padding: '40px', maxWidth: '1000px', margin: '0 auto', color: 'white'}}>
      <h2 style={{borderBottom: '1px solid #444', paddingBottom: '20px'}}>Mis Pedidos 📦</h2>
      
      {orders.length === 0 ? (
        <p>No has realizado compras aún.</p>
      ) : (
        <div className="orders-list" style={{display: 'flex', flexDirection: 'column', gap: '20px', marginTop: '20px'}}>
          {orders.map(order => (
            <div key={order.idVenta} style={{backgroundColor: '#2a2a2a', padding: '20px', borderRadius: '10px', border: '1px solid #444'}}>
              <div style={{display: 'flex', justifyContent: 'space-between', marginBottom: '15px'}}>
                <span><strong>Orden #{order.idVenta}</strong></span>
                <span style={{color: '#aaa'}}>{new Date(order.fechaVenta).toLocaleDateString()}</span>
                <span style={{color: '#4ade80', fontWeight: 'bold'}}>${order.total}</span>
              </div>
              
              <div className="order-items" style={{paddingLeft: '15px', borderLeft: '3px solid #8a2ddc'}}>
                {getGamesForSale(order.idVenta).map(detail => (
                  <p key={detail.idDetalleVenta} style={{margin: '5px 0'}}>
                    • {detail.producto.titulo} (x{detail.cantidad})
                  </p>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Orders;