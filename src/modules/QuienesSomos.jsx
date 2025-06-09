import React from "react";
import { useNavigate } from "react-router-dom";
import "../components/Barra";
import Barra from "../components/Barra";
import "./QuienesSomos.css";

const QuienesSomos = () => {
  const navigate = useNavigate();
  return (
    <>
      <Barra />
      <div className="quienes-container">
        <div className="quienes-card">
          <h1 className="quienes-title">¿Quiénes Somos?</h1>
          <p className="quienes-paragraph">
            En <strong>Destino Ideal</strong> somos una empresa dedicada a crear
            experiencias inolvidables a través de la planificación de viajes
            únicos, personalizados y accesibles. Nuestro equipo combina
            tecnología, conocimiento turístico y pasión por descubrir el mundo
            para ayudarte a vivir nuevas aventuras de forma fácil, segura y
            emocionante.
          </p>

          <h2 className="quienes-subtitle">Misión</h2>
          <p className="quienes-paragraph">
            Facilitar a nuestros clientes la organización de sus viajes mediante
            herramientas intuitivas, asesoría confiable y recomendaciones
            seleccionadas, garantizando así experiencias memorables y ajustadas
            a sus intereses, presupuesto y estilo de vida.
          </p>

          <h2 className="quienes-subtitle">Visión</h2>
          <p className="quienes-paragraph">
            Ser la plataforma líder de planificación de viajes en Latinoamérica,
            reconocida por nuestra innovación, compromiso con el cliente y
            capacidad de inspirar a las personas a explorar el mundo.
          </p>

          <h2 className="quienes-subtitle">¿Qué Ofrecemos?</h2>
          <ul className="quienes-list">
            <li>
              Planificación personalizada de viajes nacionales e internacionales
            </li>
            <li>Herramientas interactivas para armar itinerarios</li>
            <li>Recomendaciones de hospedaje, actividades y gastronomía</li>
            <li>Soporte y asesoría en todo momento</li>
            <li>Opciones ajustadas a distintos presupuestos</li>
          </ul>
          <button className="btn-cta" onClick={() => navigate("/destinos")}>
            Empieza a planear tu viaje
          </button>
        </div>
      </div>
    </>
  );
};

export default QuienesSomos;
