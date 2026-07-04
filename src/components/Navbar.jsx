import { Link, useLocation } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

const Navbar = () => {
  const { setUser } = useContext(AuthContext);
  const location = useLocation();

  const handleLogout = () => {
    setUser(null);
  };

  return (
    <nav style={styles.nav}>
      <div style={styles.navContainer}>
        <div style={styles.links}>
          <Link 
            to="/dashboard" 
            style={{
              ...styles.link, 
              fontWeight: location.pathname === "/dashboard" ? "bold" : "normal",
              borderBottom: location.pathname === "/dashboard" ? "2px solid white" : "none"
            }}
          >
            Inicio
          </Link>
          <Link 
            to="/tips" 
            style={{
              ...styles.link, 
              fontWeight: location.pathname === "/tips" ? "bold" : "normal",
              borderBottom: location.pathname === "/tips" ? "2px solid white" : "none"
            }}
          >
            Tips de Bienestar
          </Link>
        </div>

        <button onClick={handleLogout} style={styles.logoutBtn}>
          Cerrar Sesión
        </button>
      </div>
    </nav>
  );
};

const styles = {
  nav: {
    backgroundColor: "rgba(154, 183, 154, 0.9)",
    width: "100%",
    padding: "20px 0",
    position: "absolute", 
    top: 0,
    zIndex: 100,
  },
  navContainer: {
    width: "100%",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "0 30px", 
    boxSizing: "border-box",
  },
  links: {
    display: "flex",
    gap: "25px",
  },
  link: {
    color: "white",
    textDecoration: "none",
    fontSize: "15px",
    paddingBottom: "4px",
    transition: "all 0.2s",
    textTransform: "uppercase",
    letterSpacing: "1px",
  },
  logoutBtn: {
    backgroundColor: "transparent",
    border: "2px solid rgba(255,255,255,0.7)",
    color: "white",
    padding: "8px 15px",
    borderRadius: "20px",
    cursor: "pointer",
    fontSize: "13px",
    fontWeight: "bold",
    transition: "background-color 0.2s",
  }
};

export default Navbar;