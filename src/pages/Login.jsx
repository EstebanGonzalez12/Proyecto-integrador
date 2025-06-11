const ApiUsuarios = "http://localhost:8081/api/auth/login";
import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { alerta } from "../helpers/funciones";
import "../pages/Login.css";

const Login = () => {
  const [usuario, setUsuario] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!usuario || !password) {
      alerta("Campos vacíos", "Debes completar ambos campos", "warning");
      return;
    }

    try {
      const response = await fetch(ApiUsuarios, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        // body: JSON.stringify({ usuario, password }),
      });

      if (!response.ok) throw new Error("Error en la autenticación");

      const data = await response.json();

      localStorage.setItem("token", data.token);
      localStorage.setItem("usuarioActivo", data.usuario);

      alerta("Bienvenido", "Inicio de sesión exitoso", "success").then(() => {
        const datosReserva = sessionStorage.getItem("reservaTemporal");
        if (datosReserva) {
          navigate("/reservas", { state: JSON.parse(datosReserva) });
        } else {
          navigate("/reservas");
        }
      });
    } catch (error) {
      console.error("Error:", error);
      alerta("Error", "Usuario o contraseña incorrectos", "error");
    }
  };

  return (
    <div className="login-container">
      <form className="login-form" onSubmit={handleLogin}>
        <h2>Iniciar Sesión</h2>

        <label>Usuario:</label>
        <input
          type="text"
          value={usuario}
          onChange={(e) => setUsuario(e.target.value)}
          required
        />

        <label>Contraseña:</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button type="submit">Ingresar</button>

        <p className="registro-link">
          ¿No tienes cuenta? <Link to="/register">Regístrate aquí</Link>
        </p>
      </form>
    </div>
  );
};

export default Login;
