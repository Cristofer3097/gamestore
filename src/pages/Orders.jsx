import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/UserContext';
import { getMyOrders, getOrderDetails } from '../services/loginService';
import './Orders.css'; 

const Orders = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);
  const [detailsMap, setDetailsMap] = useState({});
  const [refundedIds, setRefundedIds] = useState([]);
  const [loading, setLoading] = useState(true);

  const normalizeOrder = (order) => ({
    idVenta: order.idVenta || order.id_venta,
    fechaVenta: order.fechaVenta || order.fecha_venta,
    total: order.total,
    estado: order.estado
  });

  const normalizeDetail = (detail) => ({
    // Maneja nombres de producto
    producto: {
        idVideojuegos: detail.producto?.idVideojuegos || detail.producto?.id_videojuegos,
        titulo: detail.producto?.titulo,
        imagenUrl: detail.producto?.imagenUrl || detail.producto?.imagen_url
    },
    // Maneja precios y cantidades
    precioUnitario: detail.precioUnitario || detail.precio_unitario,
    cantidad: detail.cantidad
  });

  useEffect(() => {
    // Cargar devoluciones locales (para marcar visualmente)
    const localRefunds = JSON.parse(localStorage.getItem('refunded_orders') || '[]');
    setRefundedIds(localRefunds);

    if (user && user.idUsuario) {
      const fetchData = async () => {
         try {
            setLoading(true);

            // 1. PEDIR VENTAS
            const rawSales = await getMyOrders(user.idUsuario, user.token);

            if (Array.isArray(rawSales) && rawSales.length > 0) {
                const mySales = rawSales.map(normalizeOrder);
                
                // Ordenar: más recientes primero
                mySales.sort((a, b) => new Date(b.fechaVenta) - new Date(a.fechaVenta));
                setOrders(mySales);

                // 2. PEDIR DETALLES DE CADA VENTA
                const detailsPromises = mySales.map(sale => 
                    getOrderDetails(sale.idVenta, user.token)
                    .then(items => ({ idVenta: sale.idVenta, items: items.map(normalizeDetail) }))
                );
                
                const results = await Promise.all(detailsPromises);
                
                const newDetailsMap = {};
                results.forEach(res => {
                    newDetailsMap[res.idVenta] = res.items;
                });
                setDetailsMap(newDetailsMap);
            } else {
                setOrders([]);
            }

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

  const handleReturnClick = () => navigate('/returns');

  if (!user) return <div className="orders-page orders-empty"><h2>🔒 Inicia sesión</h2><Link to="/login" className="btn-secondary">Login</Link></div>;
  if (loading) return <div className="orders-page"><p style={{textAlign:'center', marginTop:'50px', color:'white'}}>Cargando historial...</p></div>;
  if (orders.length === 0) return <div className="orders-page orders-empty"><h2>No tienes pedidos</h2><Link to="/catalogo" className="btn-secondary">Ir a comprar</Link></div>;

  return (
    <div className="orders-page">
      <div className="orders-container">
        <h2 className="orders-title">Mis Pedidos</h2>
        <div className="orders-list">
          {orders.map(order => {
            const isRefunded = refundedIds.includes(order.idVenta);
            // Recuperamos los productos usando el ID de la venta
            const items = detailsMap[order.idVenta] || [];

            return (
              <div key={order.idVenta} className={`order-card ${isRefunded ? 'refunded' : ''}`}>
                
                {/* CABECERA DEL PEDIDO */}
                <div className="order-header">
                  <div className="header-left">
                    <div className="header-col">
                        <span className="label">FECHA</span>
                        <span className="value">{new Date(order.fechaVenta).toLocaleDateString()}</span>
                    </div>
                    <div className="header-col">
                        <span className="label">TOTAL</span>
                        <span className="value total-price">${order.total}</span>
                    </div>
                  </div>
                  <div className="header-right">
                    <span className="label">PEDIDO # {order.idVenta}</span>
                    {isRefunded && <span className="badge-refund">REEMBOLSADO</span>}
                  </div>
                </div>
                
                {/* CUERPO DEL PEDIDO */}
                <div className="order-body">
                  <h3 className="delivery-title">{isRefunded ? "Devolución" : "Entregado"}</h3>
                  
                  {items.length > 0 ? items.map((detail, idx) => (
                    <div key={idx} className="product-row">
                      <div className="product-img-box">
                        <img 
                            src={detail.producto?.imagenUrl || "https://placehold.co/100?text=No+Img"} 
                            alt="Juego" 
                        />
                      </div>
                      <div className="product-details">
                        <Link to={`/game/${detail.producto?.idVideojuegos}`} className="product-title">
                            {detail.producto?.titulo || "Producto"}
                        </Link>
                        <p className="product-subtitle">Digital / Físico</p>
                        <p className="product-price">${detail.precioUnitario}</p>
                        <span className="product-qty">Cantidad: {detail.cantidad}</span>
                      </div>
                      <div className="product-actions">
                        {!isRefunded && (
                            <button className="btn-action" onClick={handleReturnClick}>
                                ↺ Devolver
                            </button>
                        )}
                      </div>
                    </div>
                  )) : <p style={{padding:'20px', color:'#888'}}>Cargando detalles...</p>}
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