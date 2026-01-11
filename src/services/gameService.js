const mapBackendToFrontend = (backendProduct) => {
  let imageSrc = backendProduct.imagenUrl;

  if (imageSrc) {
    imageSrc = imageSrc.trim();

    // Si es URL (link), la dejamos pasar (aunque puede fallar si la web externa bloquea)
    if (imageSrc.startsWith('http')) {
       // url
    } 
    // Si ya es Base64 correcto
    else if (imageSrc.startsWith('data:image')) {
       // ok
    } 
    // Si es Base64 sin cabecera (lo arreglamos)
    else {
      // Si empieza por iVBOR es PNG, si no asumimos JPEG
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

  // Mapeo de campos del backend a los esperados en el frontend
  return {
    id: backendProduct.idVideojuegos, 
    title: backendProduct.titulo,     
    price: backendProduct.precio,     
    description: backendProduct.descripcion || "Sin descripción disponible.",
    genres: genresArray,
    platforms: platformsArray,
    image: imageSrc,  
    stock: backendProduct.stock,
    releaseDate: backendProduct.fechaLanzamiento
  };
};
// obtener los juegos desde el backend
export const getAllGames = async () => {
  try {
    const response = await fetch('/api/producto');
    
    if (!response.ok) {
      console.warn("Backend retornó error:", response.status);
      return [];
    }
    
    const data = await response.json();
    return data.map(mapBackendToFrontend);
  } catch (error) {
    console.error("Error conectando con el servidor de juegos:", error);
    return []; 
  }
};