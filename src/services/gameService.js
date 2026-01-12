const API_URL = 'https://videojuegos-backend-y87f.onrender.com/api';

const mapBackendToFrontend = (backendProduct) => {
  // 1. Manejo de IMAGEN (Seguro contra nulos)
  let imageSrc = backendProduct.imagenUrl || backendProduct.imagen_url || "";
  
  if (imageSrc) {
    imageSrc = imageSrc.trim();
    if (!imageSrc.startsWith('http') && !imageSrc.startsWith('data:image')) {
      const mime = imageSrc.startsWith('iVBOR') ? 'png' : 'jpeg';
      imageSrc = `data:image/${mime};base64,${imageSrc}`;
    }
  } else {
    imageSrc = "https://placehold.co/300x400?text=No+Img"; 
  }

  // 2. Manejo de ARRAYS 
  const genresArray = backendProduct.genero 
      ? backendProduct.genero.split(',').map(g => g.trim()) 
      : ["General"];

  const platformsArray = backendProduct.plataforma 
      ? backendProduct.plataforma.split(',').map(p => p.trim()) 
      : ["PC"];

  // 3. MAPEO ROBUSTO 
  return {
    id: backendProduct.idVideojuegos || backendProduct.idVideojuego || backendProduct.id_videojuegos || backendProduct.id, 
    title: backendProduct.titulo,     
    price: backendProduct.precio,     
    description: backendProduct.descripcion || "Sin descripción disponible.",
    genres: genresArray,
    platforms: platformsArray,
    image: imageSrc,  
    stock: backendProduct.stock,
    releaseDate: backendProduct.fechaLanzamiento || backendProduct.fecha_lanzamiento
  };
};

// OBTENER JUEGOS
export const getAllGames = async () => {
  try {
    console.log("📡 Intentando conectar a:", `${API_URL}/producto`);
 
    let response = await fetch(`${API_URL}/producto`);

    if (response.status === 404) {
        console.warn("⚠️ '/producto' no existe. Probando '/productos'...");
        response = await fetch(`${API_URL}/productos`);
    }

    if (!response.ok) {
      throw new Error(`Error del servidor: ${response.status}`);
    }
    
    const data = await response.json();
    console.log("📦 Juegos recibidos:", data); 

    if (!Array.isArray(data)) {
        console.error("❌ El backend no devolvió una lista, devolvió:", data);
        return [];
    }

    return data.map(mapBackendToFrontend);

  } catch (error) {
    console.error("❌ Error FATAL en getAllGames:", error);
    return [];
  }
};