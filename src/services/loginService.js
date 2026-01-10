// 1. Iniciar Sesión
export const loginUser = async (email, password) => {
  try {
    const response = await axios.post(`${API_URL}/auth/login`, { email, password });
    return response.data; 
  } catch (error) {
    console.error("Error en login:", error);
    throw error;
  }
};

// 2. Registrarse
export const registerUser = async (userData) => {
  try {
    const assignedRole = userData.email.toLowerCase().includes('admin') ? "ADMIN" : "USER";
    const payload = {
      nombre: userData.nombre,
      apellido: userData.apellido,
      email: userData.email,
      password: userData.password,
      telefono: userData.telefono || "0000000000",
      rol: assignedRole, 
      estado: "ACTIVO"
    };
    const response = await axios.post(`${API_URL}/auth/register`, payload);
    return response.data;
  } catch (error) {
    console.error("Error en registro:", error);
    throw error;
  }
};
// 3. Crear Venta (Cabecera)
export const createSale = async (idUsuario, total, token) => {
  try {
    console.log("🔵 Creando venta para usuario ID:", idUsuario);
    
    const config = { headers: { Authorization: `Bearer ${token}` } };
    
    const payload = {
      usuario: { idUsuario: idUsuario }, // Importante: Objeto anidado
      fechaVenta: new Date().toISOString(), // Formato ISO fecha
      total: total,
      metodoPago: "TARJETA",
      estado: "COMPLETADO"
    };

    const response = await axios.post(`${API_URL}/venta`, payload, config);
    console.log("🟢 Venta creada exitosamente:", response.data);
    return response.data; // Retorna la venta creada con su idVenta
  } catch (error) {
    console.error("🔴 Error creando venta:", error.response?.data || error);
    throw error;
  }
};

// 4. Crear Detalle de Venta (Items)
export const createSaleDetail = async (idVenta, item, token) => {
  try {
    // console.log("🔵 Agregando detalle para venta ID:", idVenta, "Producto:", item.title);
    
    const config = { headers: { Authorization: `Bearer ${token}` } };
    
    // OJO AQUÍ: 'item.id' es el ID que usa React, pero Java espera 'idVideojuegos' dentro de un objeto 'producto'
    const payload = {
      venta: { idVenta: idVenta },
      producto: { idVideojuegos: item.id }, 
      cantidad: item.quantity,
      precioUnitario: item.price,
      subtotal: item.price * item.quantity
    };

    const response = await axios.post(`${API_URL}/detalle-venta`, payload, config);
    return response.data;
  } catch (error) {
    console.error("🔴 Error creando detalle de venta:", error.response?.data || error);
    throw error;
  }
};

// 5. Obtener todas las ventas 
export const getMyOrders = async (token) => {
  try {
    const config = { headers: { Authorization: `Bearer ${token}` } };
    const response = await axios.get(`${API_URL}/venta`, config);
    return response.data;
  } catch (error) {
    console.error("Error obteniendo ordenes:", error);
    return [];
  }
};
// 6. Obtener detalles de ventas 

export const getAllSaleDetails = async (token) => {
  try {
    const config = { headers: { Authorization: `Bearer ${token}` } };
    const response = await axios.get(`${API_URL}/detalle-venta`, config);
    return response.data;
  } catch (error) {
    console.error("Error obteniendo detalles:", error);
    return [];
  }
};

// 7. DEVOLUCIONES 

export const createReturn = async (returnData, token) => {
  try {
    const config = { headers: { Authorization: `Bearer ${token}` } };
    const payload = {
      usuario: { idUsuario: returnData.idUsuario },
      factura: { idFactura: 1 }, // ID Mock temporal
      fechaDevolucion: new Date().toISOString(),
      descripcion: returnData.motivo,
      observacion: "Solicitud Web",
      estado: "PENDIENTE"
    };
    const response = await axios.post(`${API_URL}/devoluciones`, payload, config);
    return response.data;
  } catch (error) {
    console.error("Error creando devolución:", error);
    throw error;
  }
};
