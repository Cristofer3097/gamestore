const API_URL = 'https://videojuegos-backend-y87f.onrender.com/api';

const mapBackendToFrontend = (backendProduct) => {
  // 1. BLINDAJE DE IMAGEN
  let imageSrc = backendProduct.imagenUrl;

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
      ? backendProduct.genero.split(',').map(g => g.trim()) 
      : ["General"];

  const platformsArray = backendProduct.plataforma 
      ? backendProduct.plataforma.split(',').map(p => p.trim()) 
      : ["PC"];

  // 3. RETORNO FINAL (Mapeo Inteligente)
  return {
    id: backendProduct.idVideojuegos,     
    title: backendProduct.titulo,     
    price: backendProduct.precio,         
    description: backendProduct.descripcion || "Sin descripción.", 
    stock: backendProduct.stock,          
    releaseDate: backendProduct.fechaLanzamiento, 
    state: backendProduct.estado,      
    
    // Campos transformados para React
    genres: genresArray,
    platforms: platformsArray,
    image: imageSrc 
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