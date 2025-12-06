import React from 'react';
import './Search.css';

const SearchBar = ({ value, onChange }) => {
  return (
    <div className="search-bar">
      <input
        type="text"
        className="search-bar__input"
        placeholder="Buscar videojuego..."
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
      <span className="search-bar__icon">🔍</span>
    </div>
  );
};

export default SearchBar;