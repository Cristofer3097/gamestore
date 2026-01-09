import React from 'react';
import { useNavigate } from 'react-router-dom';
import Recommended from '../components/Recommended';
import './Cart.css';
import { useAuth } from '../context/UserContext';
import { createSale, createSaleDetail } from '../services/loginService';

const Cart = ({ cart, addToCart, removeFromCart, deleteFromCart, updatePlatform, onCheckout, total, games }) => {
    const { user } = useAuth();
  const navigate = useNavigate();

  // Manejar el botón de compra
    const handleBuyButton = async () => {
    if (!user) {
      alert("Debes iniciar sesión para comprar 🔒");
      navigate('/login');
      return;
    }

    try {
      // 1. Crear la venta (Header)
      const sale = await createSale(user.idUsuario, total, user.token);
      
      // 2. Crear los detalles (Items) - Backend requiere uno por uno según estructura actual
      for (const item of cart) {
        await createSaleDetail(sale.idVenta, item, user.token);
      }

      // 3. Limpiar y redirigir
      onCheckout(); // Limpia el carrito visualmente
      navigate('/orders'); // Llevar a historial
    } catch (error) {
      console.error(error);
      alert("Error al procesar la compra ❌");
    }
  };

  if (cart.length === 0) {
    return (
      <div className="cart-page">
        <div className="cart-empty">
          <h2>Tu carrito está vacío 😢</h2>
          <p>¡Corre al catálogo a buscar juegos!</p>
        </div>
        {/* Recomendaciones aleatorias */}
        <Recommended onAdd={addToCart} />
      </div>
    );
  }

  return (
    <div className="cart-page">
      <h2 className="page-title">Carrito de Compras</h2>
      
      <div className="cart-layout">
        {/* COLUMNA IZQUIERDA: PRODUCTOS */}
        <div className="cart-items-container">
          {cart.map((item) => (
            <div key={item.id} className="cart-item">
              <div className="cart-item__img-box">
                <img src={item.image} alt={item.title} />
              </div>
              
              <div className="cart-item__details">
                <h4 className="cart-item__title">{item.title}</h4>
                <div className="cart-item__platform-select">
                  <label>Versión:</label>
                  <select 
                    value={item.selectedPlatform} 
                    onChange={(e) => updatePlatform(item.id, e.target.value)}
                    className="platform-select"
                  >
                    {/* Solo mostramos las consolas disponibles para ESTE juego */}
                    {item.platforms && item.platforms.map((platform) => (
                      <option key={platform} value={platform}>
                        {platform}
                      </option>
                    ))}
                  </select>
                </div>
                <button 
                  className="btn-delete"
                  onClick={() => deleteFromCart(item.id)}
                >
                  Eliminar
                </button>
              </div>

              <div className="cart-item__controls">
                <button onClick={() => removeFromCart(item.id)}>-</button>
                <span>{item.quantity}</span>
                <button onClick={() => addToCart(item)}>+</button>
              </div>

              <div className="cart-item__price">
                ${(item.price * item.quantity).toFixed(2)}
              </div>
            </div>
          ))}
        </div>

        {/* COLUMNA DERECHA: RESUMEN */}
        <div className="cart-summary">
          <h3>Resumen del pedido</h3>
          <div className="summary-row">
            <span>Subtotal</span>
            <span>${total.toFixed(2)}</span>
          </div>
          <div className="summary-row">
            <span>Envío</span>
            <span>Gratis</span>
          </div>
          <hr />
          <div className="summary-total">
            <span>Total</span>
            <span>${total.toFixed(2)}</span>
          </div>
          <button className="btn-checkout" onClick={handleBuyButton}>
            Finalizar Compra
          </button>
        </div>
      </div>

      {/* SECCIÓN RECOMENDADOS */}
      <Recommended onAdd={addToCart} games={games} />
    </div>
  );
};

export default Cart;