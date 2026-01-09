const mapBackendToFrontend = (backendProduct) => {

  // Mapeo de campos del backend a los esperados en el frontend
  return {
    id: backendProduct.idVideojuegos, 
    title: backendProduct.titulo,     
    price: backendProduct.precio,     
    description: backendProduct.descripcion || "Sin descripción disponible.",
    genres: backendProduct.genero ? [backendProduct.genero] : ["General"],
    platforms: backendProduct.plataforma ? [backendProduct.plataforma] : ["PC"],
    image: backendProduct.imagenUrl || "https://via.placeholder.com/300x400?text=No+Image",    
    stock: backendProduct.stock,
    releaseDate: backendProduct.fechaLanzamiento
  };
};
// obtener los juegos desde el backend
export const getAllGames = async () => {
  try {
    const response = await fetch('/api/producto');
    if (!response.ok) {
      throw new Error('Error al conectar con el servidor');
    }
    const data = await response.json();
    // Transformamos la lista que viene de Java
    return data.map(mapBackendToFrontend);
  } catch (error) {
    console.error("Error obteniendo juegos:", error);
    return []; 
  }
};