import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/UserContext';
import { getMyOrders, getAllSaleDetails } from '../services/loginService';
import './Orders.css'; 

const Orders = () => {
  const { user } = useAuth();
  const [orders, setOrders] = useState([]);
  const [details, setDetails] = useState([]);
  const [refundedIds, setRefundedIds] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // 1. Cargar lista de reembolsos
    const localRefunds = JSON.parse(localStorage.getItem('refunded_orders') || '[]');
    setRefundedIds(localRefunds);

    // 2. Si hay usuario
    if (user) {
      const fetchData = async () => {
         try {
            setLoading(true);
            
            // Peticiones paralelas para mayor velocidad
            const [allSales, allDetails] = await Promise.all([
                getMyOrders(user.token),
                getAllSaleDetails(user.token)
            ]);


            const mySales = allSales.filter(s => s.usuario.idUsuario === user.idUsuario);
            
            // Ordenar por fecha (más reciente primero)
            mySales.sort((a, b) => new Date(b.fechaVenta) - new Date(a.fechaVenta));

            setOrders(mySales);
            setDetails(allDetails);
         } catch (err) {
            console.error("Error cargando pedidos:", err);
         } finally {
            setLoading(false);
         }
      };
      fetchData();
    } else {
        setLoading(false);
    }
  }, [user]);

  // Función auxiliar para encontrar los productos de una venta específica
  const getGamesForSale = (saleId) => {
    return details.filter(d => d.venta.idVenta === saleId);
  };


  // cuando no esta logueado
  if (!user) {
    return (
      <div className="orders-page">
        <div className="orders-container">
            <div className="orders-empty">
                <h2>🔒 Acceso Restringido</h2>
                <p>Necesitas iniciar sesión para ver tu historial de compras.</p>
                <Link to="/login" className="producto__btn" style={{display: 'inline-block', maxWidth: '200px', marginTop: '20px', textDecoration: 'none', textAlign: 'center'}}>
                    Ir a Iniciar Sesión
                </Link>
            </div>
        </div>
      </div>
    );
  }

  // 2. Cargando datos...
  if (loading) {
    return (
      <div className="orders-page">
        <div className="orders-container">
            <p style={{textAlign:'center', marginTop:'50px'}}>Cargando tu historial...</p>
        </div>
      </div>
    );
  }

  // 3. no tiene compras
  if (orders.length === 0) {
    return (
        <div className="orders-page">
          <div className="orders-container">
            <h2 className="orders-title">Mis Pedidos 📦</h2>
            <div className="orders-empty">
                <h2>No tienes pedidos aún</h2>
                <p>Parece que no has realizado ninguna compra.</p>
                <Link to="/catalogo" className="producto__btn" style={{display: 'inline-block', maxWidth: '200px', marginTop: '20px', textDecoration: 'none', textAlign: 'center'}}>
                    Explorar Catálogo
                </Link>
            </div>
          </div>
        </div>
    );
  }

  // 4. Usuario con compras
  return (
    <div className="orders-page">
      <div className="orders-container">
        <h2 className="orders-title">Mis Pedidos 📦</h2>
        
        <div className="orders-list">
          {orders.map(order => {
            // Verifica si esta orden fue reembolsada
            const isRefunded = refundedIds.includes(order.idVenta);

            return (
              <div key={order.idVenta} className={`order-card ${isRefunded ? 'refunded' : ''}`}>
                <div className="order-header">
                  <div>
                    <span className="order-id">Orden #{order.idVenta}</span>
                  </div>
                  <span className="order-date">
                    {new Date(order.fechaVenta).toLocaleDateString()} {new Date(order.fechaVenta).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                  </span>
                  
                  {/* ESTADO DEL PEDIDO */}
                  <div className="status-box">
                    {isRefunded ? (
                        <span className="status-label status-refunded">REEMBOLSADO ↩️</span>
                    ) : (
                        <span className="status-label status-completed">{order.estado || 'COMPLETADO'}</span>
                    )}
                    <span className="order-total">${order.total}</span>
                  </div>
                </div>
                
                <div className="order-items">
                  {getGamesForSale(order.idVenta).map((detail, idx) => (
                    <p key={idx} className="order-item-line">
                      <span>• {detail.producto.titulo}</span>
                      <span className="order-item-qty">x{detail.cantidad}</span>
                    </p>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Orders;