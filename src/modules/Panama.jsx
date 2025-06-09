import React, { useState, useEffect } from "react";
import { alerta } from "../helpers/funciones";
import { useNavigate } from "react-router-dom";
import "./DestinosCard.css";

const Panama = () => {
  const [plan, setPlan] = useState(null);
  const [noches, setNoches] = useState(1);
  const navigate = useNavigate();

  useEffect(() => {
    fetch("/fake-api.json")
      .then((res) => res.json())
      .then((data) => {
        const panamaPlan = data.planesTuristicos.find(
          (p) => p.destino === "ciudad-de-panama"
        );
        setPlan(panamaPlan);
        setNoches(panamaPlan.nochesBase);
      });
  }, []);

  if (!plan) return <p>Cargando plan turístico...</p>;

  const hotelTotal = plan.hotel.precioPorNoche * noches;
  const comidaTotal = plan.alimentacion.precioPorDia * noches;
  const actividadesTotal = plan.actividades.reduce(
    (acc, act) => acc + act.precio,
    0
  );
  const total =
    hotelTotal + comidaTotal + plan.transporte.precio + actividadesTotal;

  const handleReserva = () => {
    const datosReserva = {
      destino: plan.destino,
      noches: noches,
      total: total,
      fecha: new Date().toISOString().split("T")[0],
    };
    sessionStorage.setItem("reservaTemporal", JSON.stringify(datosReserva));
    alerta(
      "Acceso restringido",
      "Debes iniciar sesión para reservar",
      "warning"
    ).then(() => {
      navigate("/login");
    });
  };

  return (
    <div className="destinos-container">
      <div className="destinos-image">
        <img src="/images/panamados.jpg" alt="Ciudad de Panama" />
      </div>

      <div className="destinos-content">
        <h2>Ciudad de Panamá</h2>
        <p>
          Ciudad de Panamá es una moderna metrópolis en América Central que
          combina rascacielos imponentes con un encantador casco antiguo lleno
          de historia. Famosa por el Canal de Panamá, su vibrante vida nocturna,
          centros comerciales y conexión con la naturaleza, es un destino ideal
          para quienes buscan explorar cultura, comercio y paisajes en un solo
          lugar.
        </p>

        <div className="tour-package">
          <label>
            <strong>Noches: </strong>
            <input
              type="number"
              value={noches}
              min="1"
              onChange={(e) => {
                const valor = parseInt(e.target.value);
                setNoches(isNaN(valor) || valor <= 0 ? 1 : valor);
              }}
              style={{ width: "60px", marginLeft: "10px" }}
            />
          </label>
          <ul>
            <li>
              <strong>Hotel ({noches} noches):</strong> {plan.hotel.nombre} – $
              {hotelTotal}
            </li>
            <li>
              <strong>Transporte aéreo:</strong> {plan.transporte.tipo} – $
              {plan.transporte.precio}
            </li>
            <li>
              <strong>Alimentación:</strong> ${plan.alimentacion.precioPorDia}{" "}
              por día – ${comidaTotal}
            </li>
            {plan.actividades.map((act, idx) => (
              <li key={idx}>
                <strong>{act.nombre}:</strong> ${act.precio}
              </li>
            ))}
          </ul>
          <h4>
            Total estimado:{" "}
            <span style={{ color: "#0077b6" }}>${total} USD</span>
          </h4>
        </div>

        <button className="reserve-button" onClick={handleReserva}>
          RESERVAR
        </button>
      </div>
    </div>
  );
};

export default Panama;
