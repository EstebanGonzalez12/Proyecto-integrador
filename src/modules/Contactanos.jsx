import React, { useState } from "react";
import "./Contactanos.css";
import Barra from "../components/Barra";
import { alerta } from "../helpers/funciones";

const Contactanos = () => {
  const [formulario, setFormulario] = useState({
    nombre: "",
    correo: "",
    mensaje: "",
  });

  const handleChange = (e) => {
    setFormulario({ ...formulario, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formulario.nombre || !formulario.correo || !formulario.mensaje) {
      alerta("Campos vacíos", "Todos los campos son obligatorios", "warning");
      return;
    }

    alerta(
      "Mensaje enviado",
      "Gracias por contactarnos. Te responderemos pronto",
      "success"
    );

    setFormulario({ nombre: "", correo: "", mensaje: "" });
  };

  return (
    <>
      <Barra /> {/* ✅ Mostrará la barra */}
      <div className="contacto-container">
        <h2>Contáctanos</h2>
        <form className="contacto-form" onSubmit={handleSubmit}>
          <label>Nombre:</label>
          <input
            type="text"
            name="nombre"
            value={formulario.nombre}
            onChange={handleChange}
          />

          <label>Correo electrónico:</label>
          <input
            type="email"
            name="correo"
            value={formulario.correo}
            onChange={handleChange}
          />

          <label>Mensaje:</label>
          <textarea
            name="mensaje"
            rows="5"
            value={formulario.mensaje}
            onChange={handleChange}
          ></textarea>

          <button type="submit">Enviar</button>
        </form>
      </div>
    </>
  );
};

export default Contactanos;
