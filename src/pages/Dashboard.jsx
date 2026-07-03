import { useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import dataJson from "../data/data.json";

const Dashboard = () => {
  const { user, setUser } = useContext(AuthContext); 
  const navigate = useNavigate(); 

  const [cares, setCares] = useState([]);
  const [newTask, setNewTask] = useState("");

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

    const newCareObj = {
      id: Date.now(), 
      task: newTask,
      completed: false,
    };
    setCares([...cares, newCareObj]); 
    setNewTask(""); 
  };

  const handleDeleteCare = (id) => {
    const filteredCares = cares.filter((care) => care.id !== id);
    setCares(filteredCares);
  };

 
  
  // modo edición
  const startEditing = (care) => {
    setEditingId(care.id);
    setEditText(care.task);
  };

  // guardar los cambios
  const saveEdit = (id) => {
    if (editText.trim() === "") return;
    

    const updatedCares = cares.map(care => 
      care.id === id ? { ...care, task: editText } : care
    );
    
    setCares(updatedCares);
    setEditingId(null);
  };


  if (user?.role === "admin") {
    return (
      <div style={styles.container}>
        <div style={styles.header}>
          <h2>Panel de Administrador ⚙️</h2>
          <button onClick={handleLogout} style={styles.logoutBtn}>Salir</button>
        </div>
        <div style={styles.card}>
          <h3>Gestión Global</h3>
          <p>Bienvenido Admin. Acá podrías ver estadísticas globales, gestionar usuarios o crear rutinas maestras.</p>
        </div>
      </div>
    );
  }

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h2>Panel de Mascotas 🐾</h2>
        <button onClick={handleLogout} style={styles.logoutBtn}>Cerrar Sesión</button>
      </div>

      <div style={styles.card}>
        <h3 style={styles.title}>Cuidados de Mikorin 🐈</h3>
        
        <form onSubmit={handleAddCare} style={styles.form}>
          <input
            type="text"
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
            placeholder="Ej: Cambiar agua"
            style={styles.input}
          />
          <button type="submit" style={styles.addBtn}>Añadir</button>
        </form>

        <ul style={styles.list}>
          {cares.map((care) => (
            <li key={care.id} style={styles.listItem}>
              
              {/* RENDERIZADO CONDICIONAL: Si el ID coincide, mostramos un input. Si no, mostramos el texto normal */}
              {editingId === care.id ? (
                <div style={{ display: 'flex', gap: '10px', flex: 1 }}>
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
                  <span>{care.task}</span>
                  <div>
                    <button 
                      onClick={() => startEditing(care)} 
                      style={styles.actionBtn}
                      title="Editar tarea"
                    >
                      ✏️
                    </button>
                    <button 
                      onClick={() => handleDeleteCare(care.id)} 
                      style={styles.actionBtn}
                      title="Eliminar tarea"
                    >
                      🗑️
                    </button>
                  </div>
                </>
              )}
            </li>
          ))}
        </ul>

        {cares.length === 0 && <p style={{textAlign: "center", color: "#666"}}>¡Mikorin está al día! No hay tareas pendientes.</p>}
      </div>
    </div>
  );
};


const styles = {
  container: {
    minHeight: "100vh",
    backgroundColor: "#fcf9f2",
    fontFamily: "Arial, sans-serif",
    padding: "20px",
  },
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    maxWidth: "600px",
    margin: "0 auto 20px auto",
    color: "#7fa183",
  },
  logoutBtn: {
    backgroundColor: "transparent",
    border: "2px solid #7fa183",
    color: "#7fa183",
    padding: "8px 16px",
    borderRadius: "8px",
    cursor: "pointer",
    fontWeight: "bold",
  },
  card: {
    backgroundColor: "#ffffff",
    padding: "30px",
    borderRadius: "15px",
    boxShadow: "0 4px 15px rgba(0, 0, 0, 0.05)",
    maxWidth: "600px",
    margin: "0 auto",
  },
  title: {
    color: "#333",
    marginBottom: "20px",
    borderBottom: "2px solid #f0f0f0",
    paddingBottom: "10px",
  },
  form: {
    display: "flex",
    gap: "10px",
    marginBottom: "20px",
  },
  input: {
    flex: 1,
    padding: "10px",
    borderRadius: "8px",
    border: "1px solid #ddd",
    fontSize: "14px",
  },
  addBtn: {
    backgroundColor: "#7fa183",
    color: "white",
    border: "none",
    padding: "10px 20px",
    borderRadius: "8px",
    cursor: "pointer",
    fontWeight: "bold",
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
    padding: "15px",
    backgroundColor: "#fafafa",
    border: "1px solid #eee",
    borderRadius: "8px",
    marginBottom: "10px",
  },
  actionBtn: {
    backgroundColor: "transparent",
    border: "none",
    cursor: "pointer",
    fontSize: "16px",
    marginLeft: "10px",
  },
  editInput: {
    flex: 1,
    padding: "5px",
    borderRadius: "4px",
    border: "1px solid #7fa183",
  },
  saveBtn: {
    backgroundColor: "#7fa183",
    color: "white",
    border: "none",
    padding: "5px 10px",
    borderRadius: "4px",
    cursor: "pointer",
  },
  cancelBtn: {
    backgroundColor: "#ccc",
    color: "black",
    border: "none",
    padding: "5px 10px",
    borderRadius: "4px",
    cursor: "pointer",
  }
};

export default Dashboard;