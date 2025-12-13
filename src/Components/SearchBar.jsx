// src/components/SearchBar.jsx
import React from "react";

function SearchBar({ onSearch }) {
  return (
    <input
      type="text"
      placeholder="Buscar curso..."
      onChange={(e) => onSearch(e.target.value)}
      className="border p-3 rounded-lg w-full mb-4"
    />
  );
}

export default SearchBar;