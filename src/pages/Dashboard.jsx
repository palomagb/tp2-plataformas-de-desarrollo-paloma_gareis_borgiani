import { useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import dataJson from "../data/data.json";

const Dashboard = () => {
  const { user, setUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const [cares, setCares] = useState([]);
  const [newTask, setNewTask] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [alertMsg, setAlertMsg] = useState("");

  const [editingId, setEditingId] = useState(null);
  const [editText, setEditText] = useState("");

  useEffect(() => {
    if (!user) {
      navigate("/");
      return;
    }
    if (user.role === "user") {
      const userPet = dataJson.pets.find((pet) => pet.userId === user.id);
      if (userPet) {
        setCares(userPet.cares);
      }
    }
  }, [user, navigate]);

  const handleLogout = () => {
    setUser(null);
    navigate("/");
  };

  const handleAddCare = (e) => {
    e.preventDefault();
    if (newTask.trim() === "") return;

    // validacion
    const isDuplicate = cares.some(care => care.task.toLowerCase() === newTask.trim().toLowerCase());

    if (isDuplicate) {
      setAlertMsg("¡ATENCIÓN! ¡Epa! Este cuidado ya está en la lista.");
      setTimeout(() => setAlertMsg(""), 3500);
      return;
    }

    const newCareObj = {
      id: Date.now(),
      task: newTask,
      completed: false,
    };
    setCares([...cares, newCareObj]);
    setNewTask("");
    setAlertMsg("");
  };

  const handleDeleteCare = (id) => {
    const filteredCares = cares.filter((care) => care.id !== id);
    setCares(filteredCares);
  };

  const toggleComplete = (id) => {
    const updatedCares = cares.map(care =>
      care.id === id ? { ...care, completed: !care.completed } : care
    );
    setCares(updatedCares);
  };

 
  const startEditing = (care) => {
    setEditingId(care.id);
    setEditText(care.task);
  };

  // guardar los cambios
  const saveEdit = (id) => {
    if (editText.trim() === "") return;

    const isDuplicate = cares.some(care => care.id !== id && care.task.toLowerCase() === editText.trim().toLowerCase());
    if (isDuplicate) {
      setAlertMsg("¡ATENCIÓN! ¡Epa! Este cuidado ya está en la lista.");
      setTimeout(() => setAlertMsg(""), 3500);
      return;
    }

    const updatedCares = cares.map(care =>
      care.id === id ? { ...care, task: editText } : care
    );

    setCares(updatedCares);
    setEditingId(null);
  };


  if (user?.role === "admin") {
    return (
      <div style={styles.container}>
        <div style={styles.headerAdmin}>
          <h2>Panel de Administrador ⚙️</h2>
          <button onClick={handleLogout} style={styles.logoutBtn}>Salir</button>
        </div>
        <div style={styles.cardAdmin}>
          <h3>Gestión Global</h3>
          <p>Bienvenido Admin. Acá podrías ver estadísticas globales, gestionar usuarios o crear rutinas maestras.</p>
        </div>
      </div>
    );
  }

  const filteredCares = cares.filter(care => care.task.toLowerCase().includes(searchTerm.toLowerCase()));

  return (
    <div style={styles.container}>

      {/* ALERTA FLOTANTE */}
      {alertMsg && (
        <div style={styles.alert}>
          <img src="/advertencia.png" alt="Editar" style={{ width: "22px" }} /><div style={{ display: "flex", flexDirection: "column" }}>
            <span style={{ fontSize: "14px", fontWeight: "bold" }}>{alertMsg.split("¡Epa!")[0]}</span>
            <span style={{ fontSize: "12px", fontWeight: "normal" }}>¡Epa! {alertMsg.split("¡Epa!")[1]}</span>
          </div>
        </div>
      )}

      {/* HEADER */}
      <header style={styles.header}>
        <div style={styles.logoContainer}>
          <img src="/logo_patita_rosa.png" alt="Logo Patita" style={{ width: "80px" }} />
        </div>
        <h1 style={styles.mainTitle}>Pet Care Tracker</h1>
        <p style={styles.subtitle}>Gestionando el bienestar de tus mascotas</p>
        <button onClick={handleLogout} style={styles.logoutBtnTop}>Cerrar Sesión</button>
      </header>

      <main style={styles.mainContent}>

        {/* FORMULARIO */}
        <div style={styles.addCard}>
          <form onSubmit={handleAddCare} style={styles.form}>
            <input
              type="text"
              value={newTask}
              onChange={(e) => setNewTask(e.target.value)}
              placeholder="Colocar agua fresca..."
              style={styles.inputAdd}
            />
            <button type="submit" style={styles.addBtn}>Añadir</button>
          </form>
        </div>

        {/* BUSCADOR */}
        <div style={styles.searchContainer}>
          <img src="/lupa.png" alt="Buscar" style={{ width: "20px", marginRight: "10px" }} />
          <input
            type="text"
            placeholder="Buscar cuidado..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={styles.searchInput}
          />
        </div>

        {/* LISTA DE CUIDADOS */}
        {filteredCares.length > 0 ? (
          <ul style={styles.list}>
            {filteredCares.map((care) => (
              <li key={care.id} style={styles.listItem}>

                {editingId === care.id ? (
                  <div style={{ display: 'flex', gap: '10px', flex: 1, alignItems: 'center' }}>
                    <input
                      type="text"
                      value={editText}
                      onChange={(e) => setEditText(e.target.value)}
                      style={styles.editInput}
                    />
                    <button onClick={() => saveEdit(care.id)} style={styles.saveBtn}>Guardar</button>
                    <button onClick={() => setEditingId(null)} style={styles.cancelBtn}>Cancelar</button>
                  </div>
                ) : (
                  <>
                    <div style={styles.taskLeft}>
                      <input
                        type="checkbox"
                        checked={care.completed}
                        onChange={() => toggleComplete(care.id)}
                        style={styles.checkbox}
                      />
                      <span style={{
                        textDecoration: care.completed ? 'line-through' : 'none',
                        color: care.completed ? '#bbb' : '#555',
                        fontSize: '16px',
                        fontWeight: '500'
                      }}>
                        {care.task}
                      </span>
                    </div>

                    <div style={styles.taskRight}>
                      <button onClick={() => startEditing(care)} style={styles.actionBtn} title="Editar tarea">
                        <img src="/lapiz.png" alt="Editar" style={{ width: "22px" }} />
                      </button>
                      <button onClick={() => handleDeleteCare(care.id)} style={styles.actionBtn} title="Eliminar tarea">
                        <img src="/eliminar.png" alt="Eliminar" style={{ width: "22px" }} />
                      </button>
                    </div>
                  </>
                )}
              </li>
            ))}
          </ul>
        ) : (
          <div style={styles.emptyState}>
            <img src="/patita.png" alt="Sin tareas" style={{ width: "80px", opacity: 0.5 }} />
            <p style={{ color: '#999', marginTop: '15px', fontWeight: '500' }}>No hay cuidados registrados por aquí.</p>
          </div>
        )}
      </main>

      {/* FOOTER */}
      <footer style={styles.footer}>
        <img src="/logo_patita_blanca.png" alt="Sin tareas" style={{ width: "50px", opacity: 0.5 }} />
        <p style={{ margin: '5px 0', fontSize: '14px' }}>Paloma Gareis Borgiani — Escuela Da Vinci</p>
        <p style={{ margin: '0', fontSize: '12px', opacity: 0.8 }}>© 2026 PET CARE TRACKER</p>
      </footer>
    </div>
  );
};

const styles = {
  container: {
    minHeight: "100vh",
    backgroundColor: "#FDF9F1",
    fontFamily: "'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    position: "relative",
  },
  alert: {
    position: "absolute",
    top: "30px",
    backgroundColor: "#FFFFE0",
    borderLeft: "6px solid #FBC02D",
    padding: "15px 25px",
    borderRadius: "8px",
    boxShadow: "0 6px 15px rgba(0,0,0,0.15)",
    color: "#333",
    zIndex: 1000,
    display: "flex",
    alignItems: "center",
    gap: "15px",
    animation: "fadeInDown 0.3s ease-out"
  },
  header: {
    backgroundColor: "#9AB79A",
    width: "100%",
    padding: "40px 20px 30px 20px",
    textAlign: "center",
    color: "white",
    boxShadow: "0 4px 6px rgba(0,0,0,0.05)",
    position: "relative"
  },
  headerAdmin: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    padding: "20px",
    backgroundColor: "#9AB79A",
    color: "white",
  },
  cardAdmin: {
    backgroundColor: "#ffffff",
    padding: "30px",
    borderRadius: "15px",
    boxShadow: "0 4px 15px rgba(0, 0, 0, 0.05)",
    maxWidth: "600px",
    margin: "40px auto",
  },
  logoContainer: {
    marginBottom: "5px",
  },
  mainTitle: {
    margin: "0 0 5px 0",
    fontSize: "32px",
    fontWeight: "800",
  },
  subtitle: {
    margin: "0",
    fontSize: "16px",
    opacity: 0.9,
    fontWeight: "500",
  },
  logoutBtnTop: {
    position: "absolute",
    top: "20px",
    right: "20px",
    backgroundColor: "transparent",
    border: "2px solid rgba(255,255,255,0.7)",
    color: "white",
    padding: "8px 15px",
    borderRadius: "20px",
    cursor: "pointer",
    fontSize: "13px",
    fontWeight: "bold",
    transition: "background-color 0.2s",
  },
  logoutBtn: {
    backgroundColor: "transparent",
    border: "2px solid white",
    color: "white",
    padding: "8px 16px",
    borderRadius: "8px",
    cursor: "pointer",
    fontWeight: "bold",
  },
  mainContent: {
    width: "100%",
    maxWidth: "650px",
    padding: "40px 20px",
    flex: 1,
  },
  addCard: {
    backgroundColor: "white",
    padding: "15px",
    borderRadius: "15px",
    boxShadow: "0 8px 25px rgba(0,0,0,0.06)",
    marginBottom: "40px",
  },
  form: {
    display: "flex",
    gap: "15px",
  },
  inputAdd: {
    flex: 1,
    padding: "15px 20px",
    borderRadius: "10px",
    border: "1px solid #EAEAEA",
    fontSize: "16px",
    outline: "none",
    color: "#555"
  },
  addBtn: {
    backgroundColor: "#9AB79A",
    color: "white",
    border: "none",
    padding: "0 35px",
    borderRadius: "10px",
    cursor: "pointer",
    fontWeight: "bold",
    fontSize: "16px",
    boxShadow: "0 4px 10px rgba(154, 183, 154, 0.3)",
  },
  searchContainer: {
    display: "flex",
    alignItems: "center",
    borderBottom: "2px solid #EAEAEA",
    paddingBottom: "10px",
    marginBottom: "35px",
  },
  searchIcon: {
    color: "#999",
    marginRight: "10px",
    fontSize: "20px",
  },
  searchInput: {
    border: "none",
    background: "transparent",
    fontSize: "16px",
    width: "100%",
    outline: "none",
    color: "#555",
  },
  list: {
    listStyleType: "none",
    padding: 0,
    margin: 0,
  },
  listItem: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "20px 25px",
    backgroundColor: "white",
    borderRadius: "12px",
    marginBottom: "15px",
    boxShadow: "0 5px 15px rgba(0,0,0,0.04)",
    border: "1px solid #F5F5F5",
  },
  taskLeft: {
    display: "flex",
    alignItems: "center",
    gap: "15px",
  },
  checkbox: {
    width: "22px",
    height: "22px",
    cursor: "pointer",
    accentColor: "#9AB79A",
  },
  taskRight: {
    display: "flex",
    gap: "15px",
  },
  actionBtn: {
    backgroundColor: "transparent",
    border: "none",
    cursor: "pointer",
    fontSize: "18px",
    opacity: 0.5,
    transition: "opacity 0.2s",
  },
  editInput: {
    flex: 1,
    padding: "10px",
    borderRadius: "6px",
    border: "2px solid #9AB79A",
    fontSize: "15px",
    outline: "none",
  },
  saveBtn: {
    backgroundColor: "#9AB79A",
    color: "white",
    border: "none",
    padding: "10px 15px",
    borderRadius: "6px",
    cursor: "pointer",
    fontWeight: "bold",
  },
  cancelBtn: {
    backgroundColor: "#F0F0F0",
    color: "#555",
    border: "none",
    padding: "10px 15px",
    borderRadius: "6px",
    cursor: "pointer",
    fontWeight: "bold",
  },
  emptyState: {
    textAlign: "center",
    padding: "50px 0",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  footer: {
    backgroundColor: "#9AB79A",
    width: "100%",
    padding: "25px 20px",
    textAlign: "center",
    color: "white",
    marginTop: "auto",
  }
};

export default Dashboard;