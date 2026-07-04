import { useContext, useState, useEffect } from "react";
import { AuthContext } from "../context/AuthContext";
import dataJson from "../data/data.json";
import Navbar from "./Navbar";

const UserPanel = () => {
    const { user } = useContext(AuthContext);

    const [cares, setCares] = useState([]);
    const [newTask, setNewTask] = useState("");
    const [searchTerm, setSearchTerm] = useState("");
    const [alertMsg, setAlertMsg] = useState("");
    const [editingId, setEditingId] = useState(null);
    const [editText, setEditText] = useState("");
    const [isDataLoaded, setIsDataLoaded] = useState(false);

    useEffect(() => {
        if (user && user.role === "user") {
            try {
                const savedCares = localStorage.getItem(`petTracker_cares_${user.id}`);
                if (savedCares) {
                    setCares(JSON.parse(savedCares));
                } else {
                    const userPet = dataJson.pets.find((pet) => pet.userId === user.id);
                    setCares(userPet ? userPet.cares : []);
                }
            } catch (error) {
                const userPet = dataJson.pets.find((pet) => pet.userId === user.id);
                setCares(userPet ? userPet.cares : []);
            }
            setIsDataLoaded(true);
        }
    }, [user]);

    useEffect(() => {
        if (isDataLoaded && user && user.role === "user") {
            localStorage.setItem(`petTracker_cares_${user.id}`, JSON.stringify(cares));
        }
    }, [cares, user, isDataLoaded]);

    const handleAddCare = (e) => {
        e.preventDefault();
        if (newTask.trim() === "") return;

        const isDuplicate = cares.some(care => care.task.toLowerCase() === newTask.trim().toLowerCase());
        if (isDuplicate) {
            setAlertMsg("¡ATENCIÓN! ¡Ups! Este cuidado ya está en la lista.");
            setTimeout(() => setAlertMsg(""), 3500);
            return;
        }

        const newCareObj = { id: Date.now(), task: newTask, completed: false };
        setCares([...cares, newCareObj]);
        setNewTask("");
        setAlertMsg("");
    };

    const handleDeleteCare = (id) => {
        setCares(cares.filter((care) => care.id !== id));
    };

    const toggleComplete = (id) => {
        setCares(cares.map(care => care.id === id ? { ...care, completed: !care.completed } : care));
    };

    const startEditing = (care) => {
        setEditingId(care.id);
        setEditText(care.task);
    };

    const saveEdit = (id) => {
        if (editText.trim() === "") return;
        const isDuplicate = cares.some(care => care.id !== id && care.task.toLowerCase() === editText.trim().toLowerCase());
        if (isDuplicate) {
            setAlertMsg("¡ATENCIÓN! ¡Ups! Este cuidado ya está en la lista.");
            setTimeout(() => setAlertMsg(""), 3500);
            return;
        }
        setCares(cares.map(care => care.id === id ? { ...care, task: editText } : care));
        setEditingId(null);
    };

    const filteredCares = cares.filter(care => care.task.toLowerCase().includes(searchTerm.toLowerCase()));

    return (
        <div style={styles.container}>
            <Navbar />

            {alertMsg && (
                <div style={styles.alert}>
                    <img src="/advertencia.png" alt="Advertencia" style={{ width: "22px" }} />
                    <div style={{ display: "flex", flexDirection: "column" }}>
                        <span style={{ fontSize: "14px", fontWeight: "bold" }}>{alertMsg.split("¡Ups!")[0]}</span>
                        <span style={{ fontSize: "12px", fontWeight: "normal" }}>¡Ups! {alertMsg.split("¡Ups!")[1]}</span>
                    </div>
                </div>
            )}

            <header style={styles.headerUser}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '20px' }}>
                    <img src="/logo_patita_rosa.png" alt="Logo Patita" style={{ width: "80px" }} />
                    <div style={{ textAlign: "left" }}>
                        <h1 style={styles.mainTitle}>Pet Care Tracker</h1>
                        <p style={styles.subtitleUser}>Gestionando el bienestar de tus mascotas</p>
                    </div>
                </div>
            </header>

            <main style={styles.mainContentUser}>
                <div style={styles.addCardUser}>
                    <form onSubmit={handleAddCare} style={styles.form}>
                        <input
                            type="text"
                            value={newTask}
                            onChange={(e) => setNewTask(e.target.value)}
                            placeholder="Colocar agua fresca..."
                            style={styles.inputAddUser}
                        />
                        <button type="submit" style={styles.addBtn}>Añadir</button>
                    </form>
                </div>

                <div style={styles.searchContainerUser}>
                    <img src="/lupa.png" alt="Buscar" style={{ width: "20px", marginRight: "10px" }} />
                    <input
                        type="text"
                        placeholder="Buscar cuidado..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        style={styles.searchInput}
                    />
                </div>

                {filteredCares.length > 0 ? (
                    <ul style={styles.list}>
                        {filteredCares.map((care) => (
                            <li key={care.id} style={styles.listItem}>
                                {editingId === care.id ? (
                                    <div style={{ display: 'flex', gap: '10px', flex: 1, alignItems: 'center' }}>
                                        <input type="text" value={editText} onChange={(e) => setEditText(e.target.value)} style={styles.editInput} />
                                        <button onClick={() => saveEdit(care.id)} style={styles.saveBtn}>Guardar</button>
                                        <button onClick={() => setEditingId(null)} style={styles.cancelBtn}>Cancelar</button>
                                    </div>
                                ) : (
                                    <>
                                        <div style={styles.taskLeft}>
                                            <input type="checkbox" checked={care.completed} onChange={() => toggleComplete(care.id)} style={styles.checkbox} />
                                            <span style={{ textDecoration: care.completed ? 'line-through' : 'none', color: care.completed ? '#bbb' : '#555', fontSize: '16px', fontWeight: '500' }}>
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
                        <p style={{ color: '#999', marginTop: '15px', fontWeight: '500', fontStyle: 'italic' }}>No hay cuidados registrados por aquí.</p>
                    </div>
                )}
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
    alert: { position: "fixed", top: "90px", right: "30px", backgroundColor: "#FFFFE0", borderLeft: "6px solid #FBC02D", padding: "15px 25px", borderRadius: "8px", boxShadow: "0 10px 25px rgba(0,0,0,0.2)", color: "#333", zIndex: 1000, display: "flex", alignItems: "center", gap: "15px" },
    headerUser: { backgroundColor: "#9AB79A", width: "100%", padding: "80px 20px 80px 20px", textAlign: "center", color: "white", boxShadow: "0 4px 6px rgba(0,0,0,0.05)", position: "relative" },
    mainTitle: { margin: "0 0 5px 0", fontSize: "32px", fontWeight: "800" },
    subtitleUser: { margin: "0", fontSize: "16px", opacity: 0.9, fontWeight: "500", fontStyle: "italic" },
    mainContentUser: { width: "100%", maxWidth: "650px", padding: "0 20px 40px 20px", flex: 1 },
    addCardUser: { backgroundColor: "white", padding: "20px", borderRadius: "20px", boxShadow: "0 8px 25px rgba(0,0,0,0.08)", marginBottom: "35px", marginTop: "-60px", position: "relative", zIndex: 10 },
    form: { display: "flex", gap: "15px" },
    inputAddUser: { flex: 1, padding: "15px 20px", borderRadius: "15px", border: "2px solid #9AB79A", fontSize: "16px", outline: "none", color: "#333" },
    addBtn: { backgroundColor: "#9AB79A", color: "white", border: "none", padding: "0 35px", borderRadius: "10px", cursor: "pointer", fontWeight: "bold", fontSize: "16px", boxShadow: "0 4px 10px rgba(154, 183, 154, 0.3)" },
    searchContainerUser: { display: "flex", alignItems: "center", backgroundColor: "white", padding: "12px 20px", borderRadius: "10px 10px 0 0", borderBottom: "3px solid #9AB79A", marginBottom: "35px", boxShadow: "0 2px 10px rgba(0,0,0,0.02)" },
    searchInput: { border: "none", background: "transparent", fontSize: "16px", width: "100%", outline: "none", color: "#555" },
    list: { listStyleType: "none", padding: 0, margin: 0 },
    listItem: { display: "flex", justifyContent: "space-between", alignItems: "center", padding: "20px 25px", backgroundColor: "white", borderRadius: "12px", marginBottom: "15px", boxShadow: "0 5px 15px rgba(0,0,0,0.04)", border: "1px solid #F5F5F5" },
    taskLeft: { display: "flex", alignItems: "center", gap: "15px" },
    checkbox: { width: "22px", height: "22px", cursor: "pointer", accentColor: "#9AB79A" },
    taskRight: { display: "flex", gap: "15px" },
    actionBtn: { backgroundColor: "transparent", border: "none", cursor: "pointer", opacity: 0.5 },
    editInput: { flex: 1, padding: "10px", borderRadius: "6px", border: "2px solid #9AB79A", fontSize: "15px", outline: "none" },
    saveBtn: { backgroundColor: "#9AB79A", color: "white", border: "none", padding: "10px 15px", borderRadius: "6px", cursor: "pointer", fontWeight: "bold" },
    cancelBtn: { backgroundColor: "#F0F0F0", color: "#555", border: "none", padding: "10px 15px", borderRadius: "6px", cursor: "pointer", fontWeight: "bold" },
    emptyState: { textAlign: "center", padding: "50px 0", display: "flex", flexDirection: "column", alignItems: "center" },
    footer: { backgroundColor: "#9AB79A", width: "100%", padding: "25px 20px", textAlign: "center", color: "white", marginTop: "auto" }
};

export default UserPanel;