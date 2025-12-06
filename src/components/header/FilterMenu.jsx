import React, { useState } from 'react';
import './FilterMenu.css';

const FilterMenu = ({ isOpen, onClose, filters, setFilters, uniqueGenres, uniquePlatforms }) => {
  if (!isOpen) return null;

  // Manejador para checkboxes (Géneros y Plataformas)
  const handleCheckboxChange = (category, value) => {
    setFilters(prev => {
      const currentList = prev[category];
      const newList = currentList.includes(value)
        ? currentList.filter(item => item !== value) 
        : [...currentList, value]; 
      return { ...prev, [category]: newList };
    });
  };

  // Manejador de precio
  const handlePriceChange = (e) => {
    setFilters(prev => ({ ...prev, maxPrice: Number(e.target.value) }));
  };

  // Resetear filtros
  const handleReset = () => {
    setFilters({ genres: [], platforms: [], maxPrice: 100, minPrice: 0 });
    onClose();
  };

  return (
    <div className="filter-dropdown">
      <div className="filter-header">
        <h4>Filtros</h4>
        <button onClick={onClose} className="close-btn">X</button>
      </div>

      {/* Opción INICIO / RESET */}
      <button className="reset-btn" onClick={handleReset}>
        🏠 Inicio (Ver todo)
      </button>

      <hr className="separator" />

      {/* FILTRO DE PRECIO */}
      <div className="filter-section">
        <h5>Precio Máximo: ${filters.maxPrice}</h5>
        <input 
          type="range" 
          min="0" 
          max="100" 
          value={filters.maxPrice} 
          onChange={handlePriceChange}
          className="price-slider"
        />
        <div className="price-labels">
          <span>$0</span>
          <span>$100+</span>
        </div>
      </div>

      <hr className="separator" />

      {/* FILTRO GÉNEROS */}
      <div className="filter-section">
        <h5>Géneros</h5>
        <div className="checkbox-group">
          {uniqueGenres.map(genre => (
            <label key={genre}>
              <input 
                type="checkbox" 
                checked={filters.genres.includes(genre)}
                onChange={() => handleCheckboxChange('genres', genre)}
              />
              {genre}
            </label>
          ))}
        </div>
      </div>

      <hr className="separator" />

      {/* FILTRO CONSOLAS */}
      <div className="filter-section">
        <h5>Consolas</h5>
        <div className="checkbox-group">
          {uniquePlatforms.map(platform => (
            <label key={platform}>
              <input 
                type="checkbox" 
                checked={filters.platforms.includes(platform)}
                onChange={() => handleCheckboxChange('platforms', platform)}
              />
              {platform}
            </label>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FilterMenu;