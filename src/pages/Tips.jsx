import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import Navbar from "../components/Navbar";

const Tips = () => {
    const { user } = useContext(AuthContext);
    const navigate = useNavigate();


    useEffect(() => {
        if (!user) {
            navigate("/");
        }
    }, [user, navigate]);


    const tips = [
        {
            id: 1,
            title: "Aceite de Coco",
            icon: "🥥",
            description: "Ideal para el cepillado. Aporta brillo, suavidad y previene problemas de piel de forma 100% natural."
        },
        {
            id: 2,
            title: "Lick Mats",
            icon: "🥛",
            description: "Untar yogur natural en una alfombra de lamido calma la ansiedad y fomenta la relajación."
        },
        {
            id: 3,
            title: "Higiene Dental",
            icon: "🦷",
            description: "Acostumbrá a tu mascota al cepillado desde pequeña. El sarro puede causar problemas graves de salud."
        },
        {
            id: 4,
            title: "Hidratación",
            icon: "💧",
            description: "Las fuentes de agua en movimiento suelen incentivar muchísimo a los animales a beber más agua fresca."
        },
        {
            id: 5,
            title: "Estimulación Mental",
            icon: "🧠",
            description: "Los juguetes interactivos o esconder premios por la casa mantienen su mente activa y evitan el aburrimiento."
        },
        {
            id: 6,
            title: "Snacks Naturales",
            icon: "🍎",
            description: "Elegí premios saludables, frutas aptas o deshidratados caseros libres de conservantes artificiales."
        }
    ];

    if (!user) return null;

    return (
        <div style={styles.container}>
            <Navbar />

            <header style={styles.header}>
                <img src="/logo_patita_rosa.png" alt="Patita" style={{ width: "70px", marginBottom: "10px" }} />
                <h2 style={styles.title}>Guía de Cuidados</h2>
                <p style={styles.subtitle}>Recomendaciones naturales para consentir a tu mascota</p>
            </header>

            <main style={styles.mainContent}>
                <div style={styles.grid}>
                    {tips.map(tip => (
                        <div key={tip.id} style={styles.card}>
                            <div style={styles.icon}>{tip.icon}</div>
                            <h3 style={styles.cardTitle}>{tip.title}</h3>
                            <p style={styles.cardDesc}>{tip.description}</p>
                        </div>
                    ))}
                </div>
            </main>

            <footer style={styles.footer}>
                <img src="/logo_patita_blanca.png" alt="Logo Footer" style={{ width: "50px", opacity: 0.5 }} />
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
    },
    header: {
        backgroundColor: "#9AB79A",
        width: "100%",
        padding: "80px 20px 40px 20px",
        textAlign: "center",
        color: "white",
    },
    title: {
        margin: "0 0 5px 0",
        fontSize: "32px",
        fontWeight: "800",
    },
    subtitle: {
        margin: "0",
        fontSize: "16px",
        opacity: 0.9,
        fontStyle: "italic",
    },
    mainContent: {
        width: "100%",
        maxWidth: "850px",
        padding: "40px 20px",
        flex: 1,
    },
    grid: {
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
        gap: "25px",
    },
    card: {
        backgroundColor: "white",
        padding: "30px",
        borderRadius: "20px",
        boxShadow: "0 8px 25px rgba(0,0,0,0.05)",
        border: "1px solid #F5F5F5",
        textAlign: "center",
    },
    icon: {
        fontSize: "45px",
        marginBottom: "15px",
    },
    cardTitle: {
        color: "#333",
        fontSize: "20px",
        margin: "0 0 10px 0",
        fontWeight: "bold",
    },
    cardDesc: {
        color: "#777",
        fontSize: "14px",
        lineHeight: "1.6",
        margin: 0,
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

export default Tips;