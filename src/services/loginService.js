// 1. Iniciar Sesión
export const loginUser = async (email, password) => {
  console.log("🔵 Intentando login con:", email);

  try {
    const response = await fetch('/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    });

    // Intentamos leer la respuesta
    const data = await response.json();

    if (!response.ok) {
      console.error("🔴 Error del Backend:", data);
      // Lanzamos el mensaje exacto que nos dio el backend (si existe)
      throw new Error(data.message || 'Credenciales inválidas o error en servidor');
    }

    console.log("🟢 Login exitoso:", data);
    return data; 

  } catch (error) {
    console.error("🔴 Error de conexión:", error);
    throw error;
  }
};

// 2. Registrarse
export const registerUser = async (userData) => {
  const response = await fetch('/api/auth/register', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(userData)
  });
  if (!response.ok) throw new Error('Error al registrar usuario');
  return await response.json();
};

// 3. Crear Venta (Cabecera)
export const createSale = async (userId, total, token) => {
  const response = await fetch('/api/venta', {
    method: 'POST',
    headers: { 
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}` 
    },
    body: JSON.stringify({
      usuario: { idUsuario: userId },
      fechaVenta: new Date().toISOString(), 
      total: total,
      metodoPago: "Tarjeta", 
      estado: "COMPLETADO"
    })
  });
  return await response.json();
};

// 4. Crear Detalle de Venta (Items)
export const createSaleDetail = async (saleId, game, token) => {
  const response = await fetch('/api/detalle-venta', {
    method: 'POST',
    headers: { 
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}` 
    },
    body: JSON.stringify({
      venta: { idVenta: saleId },
      producto: { idVideojuegos: game.id },
      cantidad: game.quantity,
      precioUnitario: game.price,
      subtotal: game.price * game.quantity
    })
  });
  return await response.json();
};

// 5. Obtener todas las ventas 
export const getMyOrders = async (token) => {
  const response = await fetch('/api/venta', {
     headers: { 'Authorization': `Bearer ${token}` }
  });
  return await response.json();
};

// 6. Obtener detalles de ventas 
export const getAllSaleDetails = async (token) => {
  const response = await fetch('/api/detalle-venta', {
    headers: { 'Authorization': `Bearer ${token}` }
  });
  return await response.json();
};