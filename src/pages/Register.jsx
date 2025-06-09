import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { alerta } from "../helpers/funciones";
import "./Register.css";

const Register = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    nombre: "",
    usuario: "",
    correo: "",
    password: "",
    confirmar: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { nombre, usuario, correo, password, confirmar } = form;

    if (!nombre || !usuario || !correo || !password || !confirmar) {
      alerta("Error", "Todos los campos son obligatorios", "error");
      return;
    }

    if (!/\S+@\S+\.\S+/.test(correo)) {
      alerta("Correo inválido", "Ingresa un correo válido", "warning");
      return;
    }

    if (password !== confirmar) {
      alerta("Contraseñas no coinciden", "Verifica las contraseñas", "warning");
      return;
    }

    fetch("/usuarios.json")
      .then((res) => res.json())
      .then((data) => {
        const listaUsuarios = data.usuarios || [];
        const yaExiste = listaUsuarios.some((u) => u.correo === correo);

        if (yaExiste) {
          alerta(
            "Usuario existente",
            "Este correo ya está registrado",
            "error"
          );
          return;
        }

        const nuevoUsuario = { nombre, usuario, correo, password };

        console.log("Usuario registrado (simulado):", nuevoUsuario);

        alerta(
          "¡Registro exitoso!",
          "Ahora puedes iniciar sesión",
          "success"
        ).then(() => {
          navigate("/login");
        });
      })
      .catch((err) => {
        console.error(err);
        alerta("Error", "No se pudo verificar el registro", "error");
      });
  };

  return (
    <div className="form-container">
      <h2>Registro de Usuario</h2>
      <form onSubmit={handleSubmit}>
        <label>Nombre completo:</label>
        <input
          type="text"
          name="nombre"
          value={form.nombre}
          onChange={handleChange}
        />

        <label>Usuario:</label>
        <input
          type="text"
          name="usuario"
          value={form.usuario}
          onChange={handleChange}
        />

        <label>Correo electrónico:</label>
        <input
          type="email"
          name="correo"
          value={form.correo}
          onChange={handleChange}
        />

        <label>Contraseña:</label>
        <input
          type="password"
          name="password"
          value={form.password}
          onChange={handleChange}
        />

        <label>Confirmar contraseña:</label>
        <input
          type="password"
          name="confirmar"
          value={form.confirmar}
          onChange={handleChange}
        />

        <button type="submit">Registrarse</button>
      </form>
    </div>
  );
};

export default Register;
