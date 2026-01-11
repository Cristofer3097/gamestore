import React from 'react';
import { useNavigate } from 'react-router-dom';
import Recommended from '../components/Recommended';
import './Cart.css';
import { useAuth } from '../context/UserContext';
import { createSale } from '../services/loginService';

const Cart = ({ cart, addToCart, removeFromCart, deleteFromCart, updatePlatform, onCheckout, total, games }) => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const handleBuyButton = async () => {
    // 1. Validaciones
    if (!user) {
      alert("🔒 Debes iniciar sesión para comprar.");
      navigate('/login');
      return;
    }
    if (!user.idUsuario) {
      alert("⚠️ Error: No se detectó tu ID de usuario. Recarga la página.");
      return;
    }

    try {
      // 2. ENVIAR PETICIÓN 
      const result = await createSale(user.idUsuario, total, cart, user.token);
      
      // 3. Éxito
      if (result) {
        alert("✅ ¡Compra realizada con éxito!");
        onCheckout();
        navigate('/orders');
      }

    } catch (error) {
      console.error("Error en compra:", error);
      alert("Hubo un problema al procesar tu compra. Revisa la consola.");
    }
  };

  if (cart.length === 0) {
    return (
      <div className="cart-page">
        <h2 className="page-title">Tu Carrito</h2>
        <div className="cart-empty">
           <h2>Tu carrito está vacío 🛒</h2>
           <p>¡Agrega algunos juegos para empezar!</p>
        </div>
        <Recommended onAdd={addToCart} games={games} />
      </div>
    );
  }

  return (
    <div className="cart-page">
      <h2 className="page-title">Tu Carrito</h2>
      <div className="cart-layout">
        <div className="cart-items-container">
          {cart.map((item) => (
            <div key={item.id} className="cart-item">
              <img src={item.image} alt={item.title} className="cart-item__img" />
              <div className="cart-item__info">
                <h3 className="cart-item__title">{item.title}</h3>
                <div className="cart-item__platform-select">
                    <label>Plataforma:</label>
                    <select value={item.selectedPlatform} onChange={(e) => updatePlatform(item.id, e.target.value)}>
                      {item.platforms?.map(p => <option key={p} value={p}>{p}</option>)}
                    </select>
                </div>
                <button className="btn-delete" onClick={() => deleteFromCart(item.id)}>Eliminar</button>
              </div>
              <div className="cart-item__controls">
                <button onClick={() => removeFromCart(item.id)}>-</button>
                <span>{item.quantity}</span>
                <button onClick={() => addToCart(item)}>+</button>
              </div>
              <div className="cart-item__price">${(item.price * item.quantity).toFixed(2)}</div>
            </div>
          ))}
        </div>

        <div className="cart-summary">
          <h3>Resumen del pedido</h3>
          <div className="summary-row"><span>Subtotal</span><span>${total.toFixed(2)}</span></div>
          <div className="summary-row"><span>Envío</span><span>Gratis</span></div>
          <hr />
          <div className="summary-total"><span>Total</span><span>${total.toFixed(2)}</span></div>
          <button className="btn-checkout" onClick={handleBuyButton}>Finalizar Compra</button>
        </div>
      </div>
      <Recommended onAdd={addToCart} games={games} />
    </div>
  );
};

export default Cart;