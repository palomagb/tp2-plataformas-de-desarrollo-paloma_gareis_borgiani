import { useContext, useState, useEffect } from "react";
import { AuthContext } from "../context/AuthContext";
import dataJson from "../data/data.json";

const AdminPanel = () => {
  const { user, setUser } = useContext(AuthContext);

  const [allUsers, setAllUsers] = useState(() => {
    try {
      const savedUsers = localStorage.getItem("petTracker_users");
      return savedUsers ? JSON.parse(savedUsers) : dataJson.users;
    } catch (error) {
      return dataJson.users;
    }
  });

  const [editingUserId, setEditingUserId] = useState(null);
  const [editUserName, setEditUserName] = useState("");
  const [editUserRole, setEditUserRole] = useState("user");
  
  const [alertMsg, setAlertMsg] = useState("");

  useEffect(() => {
    localStorage.setItem("petTracker_users", JSON.stringify(allUsers));
  }, [allUsers]);

  const handleLogout = () => {
    setUser(null);
  };

  const startEditingUser = (u) => {
    setEditingUserId(u.id);
    setEditUserName(u.username);
    setEditUserRole(u.role);
  };

  const saveUserEdit = (id) => {
    if (editUserName.trim() === "") return;
    const updatedUsers = allUsers.map(u => 
      u.id === id ? { ...u, username: editUserName, role: editUserRole } : u
    );
    setAllUsers(updatedUsers);
    setEditingUserId(null);
  };

  const deleteUser = (id) => {
    if (id === user.id) {
      setAlertMsg("¡ATENCIÓN! ¡Ups! No podés eliminar tu propia cuenta en sesión.");
      setTimeout(() => setAlertMsg(""), 3500); 
      return;
    }
    setAllUsers(allUsers.filter((u) => u.id !== id));
  };

  const handleAddNewUser = () => {
    const newUser = { id: Date.now(), username: "", password: "123", role: "user" };
    setAllUsers([...allUsers, newUser]);
    setEditingUserId(newUser.id);
    setEditUserName(newUser.username);
    setEditUserRole(newUser.role);
  };

  const totalCaresGlobal = dataJson.pets.reduce((acc, pet) => acc + pet.cares.length, 0);

  return (
    <div style={styles.container}>
      
      {alertMsg && (
        <div style={styles.alert}>
          <img src="/advertencia.png" alt="Advertencia" style={{ width: "22px" }} />
          <div style={{ display: "flex", flexDirection: "column" }}>
            <span style={{ fontSize: "14px", fontWeight: "bold" }}>{alertMsg.split("¡Ups!")[0]}</span>
            <span style={{ fontSize: "12px", fontWeight: "normal" }}>¡Ups! {alertMsg.split("¡Ups!")[1]}</span>
          </div>
        </div>
      )}

      <header style={styles.headerAdmin}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
          <img src="/logo_patita_blanca.png" alt="Logo" style={{ width: "55px" }} />
          <h2 style={{ margin: 0 }}>Pet Care Tracker: Administrador</h2>
        </div>
        <button onClick={handleLogout} style={styles.logoutBtnTop}>Cerrar Sesión</button>
      </header>

      <main style={styles.mainContent}>
        <div style={styles.statsGrid}>
          <div style={styles.statCard}>
             <img src="/usuario.png" alt="Usuario" style={{ width: "40px" }} />
             <div>
                <h4 style={styles.statTitle}>Usuarios</h4>
                <p style={styles.statNumber}>{allUsers.length}</p>
             </div>
          </div>
          <div style={styles.statCard}>
              <img src="/patita.png" alt="Mascota" style={{ width: "40px" }} />
             <div>
                <h4 style={styles.statTitle}>Mascotas</h4>
                <p style={styles.statNumber}>{dataJson.pets.length}</p>
             </div>
          </div>
          <div style={styles.statCard}>
              <img src="/care.png" alt="Cuidados" style={{ width: "40px" }} />
             <div>
                <h4 style={styles.statTitle}>Cuidados Totales</h4>
                <p style={styles.statNumber}>{totalCaresGlobal}</p>
             </div>
          </div>
        </div>

        <div style={styles.addCardAdmin}>
          <div style={styles.sectionHeader}>
            <h3 style={{ margin: 0, color: "#333" }}>Gestión de accesos</h3>
            <button style={styles.addUserBtn} onClick={handleAddNewUser}>+ Nuevo Usuario</button>
          </div>
          <ul style={styles.list}>
            {allUsers.map((u) => (
              <li key={u.id} style={styles.listItem}>
                {editingUserId === u.id ? (
                  <div style={{ display: 'flex', gap: '10px', flex: 1, alignItems: 'center' }}>
                    <input 
                      type="text" 
                      value={editUserName} 
                      onChange={(e) => setEditUserName(e.target.value)}
                      placeholder="Nombre de usuario"
                      style={styles.editInput}
                      autoFocus
                    />
                    <select 
                      value={editUserRole} 
                      onChange={(e) => setEditUserRole(e.target.value)}
                      style={styles.selectInput}
                    >
                      <option value="user">Usuario</option>
                      <option value="admin">Administrador</option>
                    </select>
                    <button onClick={() => saveUserEdit(u.id)} style={styles.saveBtn}>Guardar</button>
                    <button onClick={() => {
                      if(u.username === "") deleteUser(u.id);
                      setEditingUserId(null);
                    }} style={styles.cancelBtn}>Cancelar</button>
                  </div>
                ) : (
                  <>
                    <div style={styles.taskLeft}>
                      <div style={styles.userAvatar}>
                         <img src="/user.png" alt="Avatar" style={{ width: "24px", opacity: 0.7 }} />
                      </div>
                      <div>
                        <span style={{ display: "block", fontWeight: "bold", color: "#333" }}>{u.username}</span>
                        <span style={{ fontSize: "13px", color: u.role === "admin" ? "#9AB79A" : "#888", fontWeight: "bold" }}>
                          {u.role.toUpperCase()}
                        </span>
                      </div>
                    </div>
                    <div style={styles.taskRight}>
                      <button onClick={() => startEditingUser(u)} style={styles.actionBtn} title="Editar Usuario">
                        <img src="/lapiz.png" alt="Editar" style={{ width: "20px" }} />
                      </button>
                      <button onClick={() => deleteUser(u.id)} style={styles.actionBtn} title="Eliminar Usuario">
                        <img src="/eliminar.png" alt="Eliminar" style={{ width: "20px" }} />
                      </button>
                    </div>
                  </>
                )}
              </li>
            ))}
          </ul>
        </div>
      </main>

      <footer style={styles.footer}>
       <img src="/logo_patita_blanca.png" alt="Logo" style={{ width: "50px", opacity: 0.5 }} />
        <p style={{ margin: '5px 0', fontSize: '14px' }}>Paloma Gareis Borgiani — Escuela Da Vinci</p>
        <p style={{ margin: '0', fontSize: '12px', opacity: 0.8 }}>© 2026 PET CARE TRACKER</p>
      </footer>
    </div>
  );
};

const styles = {
  container: { minHeight: "100vh", backgroundColor: "#FDF9F1", fontFamily: "'Segoe UI', Roboto, Helvetica, Arial, sans-serif", display: "flex", flexDirection: "column", alignItems: "center", position: "relative" },
  alert: { position: "fixed", top: "90px", right: "30px", backgroundColor: "#FFFFE0", borderLeft: "6px solid #FBC02D", padding: "15px 25px", borderRadius: "8px", boxShadow: "0 10px 25px rgba(0,0,0,0.2)", color: "#333", zIndex: 1000, display: "flex", alignItems: "center", gap: "15px", animation: "fadeInDown 0.3s ease-out" },
  headerAdmin: { display: "flex", justifyContent: "space-between", alignItems: "center", width: "100%", padding: "20px 30px", backgroundColor: "#9AB79A", color: "white", boxShadow: "0 4px 6px rgba(0,0,0,0.05)" },
  logoutBtnTop: { backgroundColor: "transparent", border: "2px solid rgba(255,255,255,0.7)", color: "white", padding: "8px 15px", borderRadius: "20px", cursor: "pointer", fontSize: "13px", fontWeight: "bold", transition: "background-color 0.2s" },
  mainContent: { width: "100%", maxWidth: "650px", padding: "40px 20px", flex: 1 },
  statsGrid: { display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: "20px", marginBottom: "35px", width: "100%" },
  statCard: { backgroundColor: "white", padding: "20px", borderRadius: "12px", boxShadow: "0 5px 15px rgba(0,0,0,0.04)", border: "1px solid #F5F5F5", display: "flex", alignItems: "center", gap: "15px" },
  statTitle: { margin: "0 0 3px 0", color: "#888", fontSize: "14px", fontWeight: "normal" },
  statNumber: { margin: 0, fontSize: "22px", fontWeight: "bold", color: "#333" },
  addCardAdmin: { backgroundColor: "white", padding: "25px", borderRadius: "15px", boxShadow: "0 8px 25px rgba(0,0,0,0.06)", marginBottom: "40px", width: "100%" },
  sectionHeader: { display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" },
  addUserBtn: { backgroundColor: "#9AB79A", color: "white", border: "none", padding: "8px 16px", borderRadius: "8px", cursor: "pointer", fontWeight: "bold", fontSize: "14px", boxShadow: "0 4px 10px rgba(154, 183, 154, 0.3)" },
  list: { listStyleType: "none", padding: 0, margin: 0 },
  listItem: { display: "flex", justifyContent: "space-between", alignItems: "center", padding: "20px 25px", backgroundColor: "white", borderRadius: "12px", marginBottom: "15px", boxShadow: "0 5px 15px rgba(0,0,0,0.04)", border: "1px solid #F5F5F5" },
  taskLeft: { display: "flex", alignItems: "center", gap: "15px" },
  userAvatar: { width: "40px", height: "40px", backgroundColor: "#F0F0F0", borderRadius: "50%", display: "flex", justifyContent: "center", alignItems: "center" },
  taskRight: { display: "flex", gap: "15px" },
  actionBtn: { backgroundColor: "transparent", border: "none", cursor: "pointer", opacity: 0.5 },
  editInput: { flex: 1, padding: "10px", borderRadius: "6px", border: "2px solid #9AB79A", fontSize: "15px", outline: "none" },
  selectInput: { padding: "10px", borderRadius: "6px", border: "2px solid #EAEAEA", fontSize: "14px", outline: "none", backgroundColor: "white" },
  saveBtn: { backgroundColor: "#9AB79A", color: "white", border: "none", padding: "10px 15px", borderRadius: "6px", cursor: "pointer", fontWeight: "bold" },
  cancelBtn: { backgroundColor: "#F0F0F0", color: "#555", border: "none", padding: "10px 15px", borderRadius: "6px", cursor: "pointer", fontWeight: "bold" },
  footer: { backgroundColor: "#9AB79A", width: "100%", padding: "25px 20px", textAlign: "center", color: "white", marginTop: "auto" }
};

export default AdminPanel;