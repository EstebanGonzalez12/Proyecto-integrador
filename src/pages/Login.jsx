import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { alerta } from "../helpers/funciones";
import "../pages/Login.css";

const Login = () => {
  const [usuario, setUsuario] = useState("");
  const [password, setPassword] = useState("");
  const [usuarios, setUsuarios] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch("/usuarios.json")
      .then((res) => res.json())
      .then((data) => {
        if (data.usuarios) {
          setUsuarios(data.usuarios);
        } else {
          alerta("Error", "No se encontró la lista de usuarios", "error");
        }
      })
      .catch(() =>
        alerta("Error", "No se pudo cargar la base de usuarios", "error")
      );
  }, []);

  const handleLogin = (e) => {
    e.preventDefault();

    const usuarioValido = usuarios.find(
      (u) => u.usuario === usuario && u.password === password
    );

    if (usuarioValido) {
      const tokenSimulado = `token-${usuarioValido.usuario}-${Date.now()}`;
      localStorage.setItem("token", tokenSimulado);
      localStorage.setItem("usuarioActivo", usuarioValido.usuario);

      alerta("Bienvenido", "Inicio de sesión exitoso", "success").then(() => {
        const datosReserva = sessionStorage.getItem("reservaTemporal");
        if (datosReserva) {
          navigate("/reservas", { state: JSON.parse(datosReserva) });
        } else {
          navigate("/reservas");
        }
      });
    } else {
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
