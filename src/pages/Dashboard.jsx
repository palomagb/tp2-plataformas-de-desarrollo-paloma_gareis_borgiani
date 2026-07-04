import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import AdminPanel from "../components/AdminPanel";
import UserPanel from "../components/UserPanel";

const Dashboard = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate("/");
    }
  }, [user, navigate]);

  if (!user) return null;

  return user.role === "admin" ? <AdminPanel /> : <UserPanel />;
};

export default Dashboard;