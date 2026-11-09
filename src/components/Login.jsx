import { useState } from 'react';
import '../components-css/Login.css'; // Estilos propios de esta pantalla

// Componente de login. Recibe onLoginSuccess desde App.jsx para avisar que ya hay sesión
export function Login({ onLoginSuccess }) {
  // Estado de los campos; "value" en los inputs los mantiene sincronizados
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Se ejecuta al enviar el formulario
  const handleSubmit = (e) => {
    e.preventDefault(); // Evita que el navegador recargue la página

    const token = "1234564wef23rfef"; // Token simulado (luego vendrá de tu backend)

    localStorage.setItem("token", token); // Guarda el token para mantener la sesión
    localStorage.setItem("email", email); // Guarda el correo del usuario

    onLoginSuccess(token); // Avisa a App.jsx para que cambie a la vista con sesión
  };

  return (
    // Contenedor que centra la tarjeta en toda la pantalla
    <div className="login-container">
      {/* Tarjeta blanca con el formulario */}
      <form className="login-card" onSubmit={handleSubmit}>
        <h3 className="login-title">Iniciar Sesión</h3>

        {/* Campo de correo: htmlFor e id deben coincidir para enlazar label e input */}
        <label className="login-label" htmlFor="email">Correo electrónico</label>
        <input
          className="login-input"
          id="email"
          type="email"
          value={email}
          placeholder="tucorreo@ejemplo.com"
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        {/* Campo de contraseña */}
        <label className="login-label" htmlFor="password">Contraseña</label>
        <input
          className="login-input"
          id="password"
          type="password"
          value={password}
          placeholder="••••••••"
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        {/* Corregido: se quitó el botón de tema roto (tenía una "S" suelta y no tenía CSS). */}

        {/* Botón principal en rojo suave */}
        <button className="login-button" type="submit">Iniciar Sesión</button>
      </form>
    </div>
  );
}