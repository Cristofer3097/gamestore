import { useState, useEffect } from 'react';

export const useFavorites = () => {
  const [favorites, setFavorites] = useState(() => {
    const savedFavs = localStorage.getItem('gameFavorites');
    return savedFavs ? JSON.parse(savedFavs) : [];
  });

  useEffect(() => {
    localStorage.setItem('gameFavorites', JSON.stringify(favorites));
  }, [favorites]);

  // Agregar o Quitar de favoritos 
  const toggleFavorite = (game) => {
    const exists = favorites.find(item => item.id === game.id);
    if (exists) {
      setFavorites(favorites.filter(item => item.id !== game.id));
    } else {
      setFavorites([...favorites, game]);
    }
  };

  // Mover items 
  const moveFavorite = (index, direction) => {
    const newFavorites = [...favorites];
    if (direction === 'up' && index > 0) {
      [newFavorites[index - 1], newFavorites[index]] = [newFavorites[index], newFavorites[index - 1]];
    } else if (direction === 'down' && index < newFavorites.length - 1) {
      [newFavorites[index + 1], newFavorites[index]] = [newFavorites[index], newFavorites[index + 1]];
    }
    setFavorites(newFavorites);
  };

  // Verificar si es favorito
  const isFavorite = (id) => {
    return favorites.some(item => item.id === id);
  };

  return {
    favorites,
    toggleFavorite,
    moveFavorite,
    isFavorite
  };
};