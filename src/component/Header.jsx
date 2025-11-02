// src/component/Header.jsx
import { useState, useEffect } from "react";
import axios from "axios";
import "./componentStyle.css";

export default function Header({
  onSearch,
  onFilterCategory,
  onFilterArea,
  onRandomClick,
}) {
  const [searchTerm, setSearchTerm] = useState("");
  const [categories, setCategories] = useState([]);
  const [areas, setAreas] = useState([]);
  const BASE_URL = import.meta.env.VITE_API_URL;

  useEffect(() => {
    axios
      .get(`${BASE_URL}categories.php`)
      .then((res) => {
        if (res.data.categories) {
          setCategories(res.data.categories.map((c) => c.strCategory));
        }
      })
      .catch((err) => console.error("Error fetch categories:", err));

    axios
      .get(`${BASE_URL}list.php?a=list`)
      .then((res) => {
        if (res.data.meals) {
          setAreas(res.data.meals.map((a) => a.strArea));
        }
      })
      .catch((err) => console.error("Error fetch areas:", err));
  }, []);

  const handleSearchChange = (e) => setSearchTerm(e.target.value);
  const handleSearchSubmit = (e) => {
    e.preventDefault();
    onSearch(searchTerm.trim());
  };

  return (
    <header className="header">
      {/* ====== Nama Website ====== */}
      <div className="logo">
        🍳 <span>Dapoerku</span>
      </div>

      {/* ====== Tombol dan Filter ====== */}
      <div className="header-controls">
        <button id="random" className="option" onClick={onRandomClick}>
          Random
        </button>

        <select
          className="option"
          onChange={(e) => onFilterCategory(e.target.value)}
        >
          <option value="">Kategori</option>
          {categories.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>

        <select
          className="option"
          onChange={(e) => onFilterArea(e.target.value)}
        >
          <option value="">Country</option>
          {areas.map((area) => (
            <option key={area} value={area}>
              {area}
            </option>
          ))}
        </select>

        {/* ====== Pencarian ====== */}
        <form onSubmit={handleSearchSubmit} className="search-container">
          <input
            type="text"
            placeholder="Cari resep..."
            value={searchTerm}
            onChange={handleSearchChange}
            className="search-input"
          />
          <button type="submit" className="search-btn" aria-label="Search">
            🔍
          </button>
        </form>
      </div>
    </header>
  );
}
