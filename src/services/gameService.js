const API_URL = 'https://videojuegos-backend-y87f.onrender.com/api';

const mapBackendToFrontend = (backendProduct) => {
  // 1. BLINDAJE DE IMAGEN
  let imageSrc = backendProduct.imagenUrl || backendProduct.imagen_url || backendProduct.urlImagen || backendProduct.imagen || "";

  if (imageSrc) {
    imageSrc = imageSrc.trim();
    if (!imageSrc.startsWith('http') && !imageSrc.startsWith('data:image')) {
      const mime = imageSrc.startsWith('iVBOR') ? 'png' : 'jpeg';
      imageSrc = `data:image/${mime};base64,${imageSrc}`;
    }
  } else {
    imageSrc = "https://placehold.co/300x400?text=No+Img"; 
  }

  const genresArray = backendProduct.genero 
      ? (typeof backendProduct.genero === 'string' ? backendProduct.genero.split(',') : backendProduct.genero)
      : ["General"];

  const platformsArray = backendProduct.plataforma 
      ? (typeof backendProduct.plataforma === 'string' ? backendProduct.plataforma.split(',') : backendProduct.plataforma)
      : ["PC"];

  // 3. RETORNO FINAL (Mapeo Inteligente)
  return {
    id: backendProduct.idVideojuegos || backendProduct.id_videojuegos || backendProduct.id || backendProduct.idVideojuego, 
    
    title: backendProduct.titulo || backendProduct.title || backendProduct.nombre || "Sin Título",     
    
    price: backendProduct.precio || backendProduct.price || 0,     
    
    // DESCRIPCIÓN
    description: backendProduct.descripcion || backendProduct.description || "Sin descripción disponible.",
    
    // RESTO DE CAMPOS
    genres: Array.isArray(genresArray) ? genresArray : [String(genresArray)],
    platforms: Array.isArray(platformsArray) ? platformsArray : [String(platformsArray)],
    image: imageSrc,  
    stock: backendProduct.stock || 0,
    releaseDate: backendProduct.fechaLanzamiento || backendProduct.fecha_lanzamiento || "2024-01-01"
  };
};

export const getAllGames = async () => {
  try {
    console.log("📡 Conectando a:", `${API_URL}/producto`);
    
    const response = await fetch(`${API_URL}/producto`);

    if (!response.ok) {
      throw new Error(`Error HTTP: ${response.status}`);
    }
    
    const data = await response.json();
    
    console.log("✅ ¡ÉXITO! Datos recibidos del Backend (Status 200):", data);

    let gamesList = [];
    if (Array.isArray(data)) {
        gamesList = data;
    } else if (data && Array.isArray(data.content)) {
        gamesList = data.content; 
    } else {
        console.error("⚠️ El formato no es una lista directa. Recibimos:", data);
        return [];
    }

    return gamesList.map(mapBackendToFrontend);

  } catch (error) {
    console.error("❌ Error en getAllGames:", error);
    return [];
  }
};