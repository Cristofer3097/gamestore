// data/games.js
export const gamesMock = [
  {
    id: 1,
    title: "The Legend of Zelda: Breath of the Wild",
    price: 59.99,
    // CAMBIO: Ahora usamos corchetes [] para permitir varios
    genres: ["Aventura", "RPG", "Mundo Abierto"], 
    platforms: ["Nintendo Switch", "Wii U"],
    image: "https://m.media-amazon.com/images/I/81KGsbq8ekL._AC_UF1000,1000_QL80_.jpg" 
  },
  {
    id: 2,
    title: "God of War Ragnarok",
    price: 69.99,
    genres: ["Acción", "Aventura"],
    platforms: ["PS5", "PS4"],
    image: "https://uvejuegos.com/img/caratulas/66234/gowps4.jpg"
  },
  // ... actualiza el resto de tus juegos con este formato
];