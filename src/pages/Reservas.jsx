import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { alerta } from "../helpers/funciones";
import "./Reservas.css";

const Reservas = () => {
  const navigate = useNavigate();
  const [reserva, setReserva] = useState({
    destino: "",
    noches: 1,
    fecha: "",
    total: 0,
  });
  const [confirmada, setConfirmada] = useState(null);
  const [precios, setPrecios] = useState({});

  useEffect(() => {
    const reservaGuardada = sessionStorage.getItem("reservaTemporal");
    if (reservaGuardada) {
      const datos = JSON.parse(reservaGuardada);
      setReserva({
        destino: datos.destino || "",
        noches: datos.noches || 1,
        fecha: datos.fecha || "",
        total: datos.total || 0,
      });
    }

    fetch("/fake-api.json")
      .then((res) => res.json())
      .then((data) => setPrecios(data))
      .catch((err) =>
        console.error("Error al cargar precios de destinos:", err)
      );
  }, []);

  useEffect(() => {
    const nuevoTotal = calcularTotal(reserva.destino, parseInt(reserva.noches));
    setReserva((prev) => ({ ...prev, total: nuevoTotal }));
  }, [reserva.noches, precios]);

  const calcularTotal = (destino, noches) => {
    const plan = precios.planesTuristicos?.find((p) => p.destino === destino);
    if (!plan || isNaN(noches) || noches < 1) return 0;

    const hotel = noches * (plan.hotel?.precioPorNoche || 0);
    const alimentacion = noches * (plan.alimentacion?.precioPorDia || 0);
    const actividades = (plan.actividades || []).reduce(
      (acc, act) => acc + (act.precio || 0),
      0
    );
    const transporte = plan.transporte?.precio || 0;

    return hotel + alimentacion + actividades + transporte;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    const nuevoValor = name === "noches" ? parseInt(value) || 1 : value;
    setReserva((prev) => ({ ...prev, [name]: nuevoValor }));
  };

  const handleGuardar = () => {
    setConfirmada(reserva);
    alerta("Reserva guardada", "Tu reserva ha sido confirmada", "success");
  };

  const handleEliminar = () => {
    setReserva({ destino: "", noches: 1, fecha: "", total: 0 });
    setConfirmada(null);
    alerta("Eliminada", "Reserva eliminada", "warning");
  };

  const handleActualizar = () => {
    const nuevoTotal = calcularTotal(reserva.destino, reserva.noches);
    setReserva({ ...reserva, total: nuevoTotal });
    alerta("Actualizada", "Reserva actualizada correctamente", "info");
  };

  const cerrarSesion = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("usuarioActivo");
    alerta("Sesión cerrada", "Has cerrado sesión correctamente", "info").then(
      () => navigate("/destinos")
    );
  };

  return (
    <div className="reservas-container">
      <button className="cerrar-sesion" onClick={cerrarSesion}>
        Cerrar sesión
      </button>

      <div className="panel panel-form">
        <h3>Verificar la reserva</h3>

        <label>Destino:</label>
        <input type="text" value={reserva.destino} disabled />

        <label>Noches:</label>
        <input
          type="number"
          name="noches"
          value={reserva.noches}
          min={1}
          onChange={handleChange}
        />

        <label>Seleccionar fecha:</label>
        <input
          type="date"
          name="fecha"
          value={reserva.fecha}
          onChange={handleChange}
        />

        <label>Total estimado:</label>
        <input type="text" value={`$${reserva.total}`} disabled />

        <div className="botones">
          <button onClick={handleEliminar}>Eliminar</button>
          <button onClick={handleActualizar}>Actualizar</button>
          <button onClick={handleGuardar}>Guardar</button>
        </div>
      </div>

      <div className="panel panel-confirmacion">
        <h3>Reserva guardada</h3>
        {confirmada ? (
          <div>
            <p>
              <strong>Destino:</strong> {confirmada.destino}
            </p>
            <p>
              <strong>Noches:</strong> {confirmada.noches}
            </p>
            <p>
              <strong>Fecha:</strong> {confirmada.fecha}
            </p>
            <p>
              <strong>Total:</strong> ${confirmada.total}
            </p>
          </div>
        ) : (
          <p>No hay reservas confirmadas aún.</p>
        )}
      </div>
    </div>
  );
};

export default Reservas;
