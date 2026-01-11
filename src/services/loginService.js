const API_URL = '/api';

// Manejo de respuestas
async function handleResponse(response) {
  const data = await response.json().catch(() => ({})); 

  if (!response.ok) {
    throw data.message || data || `Error ${response.status}: Algo salió mal`;
  }
  return data;
}

// --- AUTENTICACIÓN ---

// 1. Iniciar Sesión
export const loginUser = async (email, password) => {
  try {
    const response = await fetch(`${API_URL}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    });
    return await handleResponse(response);
  } catch (error) {
    console.error("Error en login:", error);
    throw error;
  }
};

// 2. Registrarse
export const registerUser = async (userData) => {
  try {
    const payload = {
      nombre: userData.nombre,
      apellido: userData.apellido,
      email: userData.email,
      password: userData.password,
      telefono: userData.telefono || "0000000000"
    };

    const response = await fetch(`${API_URL}/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });
    return await handleResponse(response);
  } catch (error) {
    console.error("Error en registro:", error);
    throw error;
  }
};

// COMPRAS 
export const createSale = async (userId, total, cartItems, token) => {
  try {
    const payload = {
      id_usuario: userId,        
      total: total,
      metodo_pago: "TARJETA",     
      detalle: cartItems.map(item => ({  
        id_videojuego: item.id,   
        cantidad: item.quantity,
        precio_unitario: item.price, 
        subtotal: item.price * item.quantity
      }))
    };

    const response = await fetch(`${API_URL}/venta`, {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}` 
      },
      body: JSON.stringify(payload)
    });
    return await handleResponse(response);
  } catch (error) {
    console.error("Error creando venta:", error);
    throw error;
  }
};
export const createSaleDetail = async () => {};

// HISTORIAL 

export const getMyOrders = async (userId, token) => {
  try {
    const response = await fetch(`${API_URL}/venta/ByIdUsuario/${userId}`, {
      method: 'GET',
      headers: { 'Authorization': `Bearer ${token}` }
    });
    return await handleResponse(response);
  } catch (error) {
    console.error("Error obteniendo ordenes:", error);
    return [];
  }
};

export const getOrderDetails = async (saleId, token) => {
  try {
    const response = await fetch(`${API_URL}/detalle-venta/ByIdVenta/${saleId}`, {
      headers: { 'Authorization': `Bearer ${token}` }
    });
    return await handleResponse(response);
  } catch (error) {
    console.error("Error obteniendo detalles:", error);
    return [];
  }
};

export const getAllSaleDetails = async () => [];

// DEVOLUCIONES 

export const createReturn = async (returnData, token) => {
  try {
    const payload = {
      idUsuario: returnData.idUsuario,
      idFactura: returnData.saleId, //
      descripcion: returnData.motivo,
      estado: "PENDIENTE",
      observacion: "Web"
    };

    const response = await fetch(`${API_URL}/devoluciones`, {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}` 
      },
      body: JSON.stringify(payload)
    });
    return await handleResponse(response);
  } catch (error) {
    console.error("Error creando devolución:", error);
    throw error;
  }
};