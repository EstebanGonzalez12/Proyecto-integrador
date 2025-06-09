import React from "react";
import { Link, useLocation } from "react-router-dom";
import "./Barra.css";

const Barra = ({ onSearch }) => {
  const location = useLocation();
  const isDestinos = location.pathname === "/destinos";
  return (
    <nav className="navbar">
      <div className="navbar-buttons">
        <Link to="/destinos" className="nav-btn">
          Destinos
        </Link>
        <Link to="/contactanos" className="nav-btn">
          Contactanos
        </Link>
        <Link to="/#quienes" className="nav-btn">
          Quiénes Somos
        </Link>
        <Link to="/login" className="nav-btn">
          Iniciar Sesión
        </Link>
      </div>

      {isDestinos && (
        <input
          type="text"
          placeholder="Buscar destino..."
          className="search-input"
          onChange={(e) => onSearch?.(e.target.value)}
        />
      )}
    </nav>
  );
};

export default Barra;
