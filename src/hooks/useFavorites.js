import { useState, useEffect } from 'react';
import { useAuth } from '../context/UserContext';

export const useFavorites = () => {
  const { user } = useAuth() || {};

  const storageKey = user ? `favs_user_${user.idUsuario}` : 'favs_guest';
  const [favorites, setFavorites] = useState(() => { 
      const saved = localStorage.getItem(storageKey);
      return saved ? JSON.parse(saved) : [];
  });

  // Cargar al cambiar de usuario
  useEffect(() => {
    const saved = localStorage.getItem(storageKey);
    setFavorites(saved ? JSON.parse(saved) : []);
  }, [storageKey]);

  // Guardar al cambiar favoritos
  useEffect(() => {
    localStorage.setItem(storageKey, JSON.stringify(favorites));
  }, [favorites, storageKey]);

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
