import React from 'react';
import Recommended from '../components/Recommended';
import './Cart.css';

const Cart = ({ cart, addToCart, removeFromCart, deleteFromCart, total }) => {

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
                <p className="cart-item__platform">{item.platform}</p>
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
          <button className="btn-checkout">Finalizar Compra</button>
        </div>
      </div>

      {/* SECCIÓN RECOMENDADOS */}
      <Recommended onAdd={addToCart} />
    </div>
  );
};

export default Cart;