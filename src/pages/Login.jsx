import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import dataJson from "../data/data.json";

const Login = () => {

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  

  const [error, setError] = useState("");

  const { setUser } = useContext(AuthContext); // guardar el usuario
  const navigate = useNavigate(); // redirigir de pantalla

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");

    // validaciones
    if (username.trim() === "" || password.trim() === "") {
      setError("Por favor, completa todos los campos.");
      return;
    }

    const foundUser = dataJson.users.find(
      (u) => u.username === username && u.password === password
    );

    if (foundUser) {
      setUser({
        id: foundUser.id,
        username: foundUser.username,
        role: foundUser.role,
      });
      
      // redirige al dashboard
      navigate("/dashboard");
    } else {
      setError("Credenciales incorrectas. Intenta de nuevo.");
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <img src="/logo-patita.png" alt="Logo" width="140" />
        <h2 style={styles.title}> Pet Care Tracker</h2>
        <p style={styles.subtitle}>Inicia sesión para cuidar a tus mascotas</p>

        <form onSubmit={handleSubmit} style={styles.form}>
          <div style={styles.inputGroup}>
            <label style={styles.label}>Usuario</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              style={styles.input}
              placeholder="Ej: admin o usuario"
            />
          </div>

          <div style={styles.inputGroup}>
            <label style={styles.label}>Contraseña</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={styles.input}
              placeholder="••••••••"
            />
          </div>

          {error && <p style={styles.error}>{error}</p>}

          <button type="submit" style={styles.button}>
            Ingresar
          </button>
        </form>
      </div>
    </div>
  );
};


const styles = {
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
    backgroundColor: "#fcf9f2",
    fontFamily: "Arial, sans-serif",
  },
  card: {
    backgroundColor: "#ffffff",
    padding: "40px",
    borderRadius: "15px",
    boxShadow: "0 4px 15px rgba(0, 0, 0, 0.05)",
    width: "100%",
    maxWidth: "400px",
    textAlign: "center",
  },
  title: {
    color: "#7fa183",
    margin: "0 0 10px 0",
  },
  subtitle: {
    color: "#666",
    fontSize: "14px",
    marginBottom: "30px",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    textAlign: "left",
  },
  inputGroup: {
    marginBottom: "20px",
  },
  label: {
    display: "block",
    marginBottom: "5px",
    fontSize: "14px",
    color: "#333",
    fontWeight: "bold",
  },
  input: {
    width: "100%",
    padding: "10px",
    borderRadius: "8px",
    border: "1px solid #ddd",
    boxSizing: "border-box",
    fontSize: "14px",
  },
  button: {
    backgroundColor: "#7fa183",
    color: "white",
    padding: "12px",
    border: "none",
    borderRadius: "8px",
    fontSize: "16px",
    cursor: "pointer",
    fontWeight: "bold",
    marginTop: "10px",
    transition: "background-color 0.2s",
  },
  error: {
    color: "#d9534f",
    fontSize: "14px",
    margin: "0 0 15px 0",
    textAlign: "center",
    fontWeight: "bold",
  },
};

export default Login;