import { useState, useEffect } from 'react';

export const useCart = () => {
  const [cart, setCart] = useState(() => {
    const savedCart = localStorage.getItem('gameCart');
    const parsedCart = savedCart ? JSON.parse(savedCart) : [];

    return parsedCart.map(item => ({
      ...item,
      quantity: item.quantity || 1 
    }));
  });
  
  useEffect(() => {
    localStorage.setItem('gameCart', JSON.stringify(cart));
  }, [cart]);

  // Agregar al carrito 
  const addToCart = (game) => {
    const itemExists = cart.find((item) => item.id === game.id);
    
    if (itemExists) {
      setCart(cart.map((item) => 
        item.id === game.id 
          ? { ...item, quantity: item.quantity + 1 } 
          : item
      ));
    } else {
      setCart([...cart, { ...game, quantity: 1 }]);
    }
  };

  // Restar cantidad
  const removeFromCart = (id) => {
    setCart(cart.map(item => {
      if (item.id === id) {
        return { ...item, quantity: item.quantity - 1 };
      }
      return item;
    }).filter(item => item.quantity > 0)); 
  };

  const deleteFromCart = (id) => {
    setCart(cart.filter(item => item.id !== id));
  };

  const cartCount = cart.reduce((acc, item) => acc + item.quantity, 0);
  const total = cart.reduce((acc, item) => acc + (item.price * item.quantity), 0);

  return {
    cart,
    addToCart,
    removeFromCart,
    deleteFromCart, 
    cartCount,
    total
  };
};