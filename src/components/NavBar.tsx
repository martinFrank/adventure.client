import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../auth/AuthContext";
import { useCurrentUser } from "../hooks/useCurrentUser";

export default function NavBar() {
  const { logout } = useAuth();
  const navigate = useNavigate();
  const user = useCurrentUser();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav style={{ display: "flex", gap: "1rem", padding: "1rem", background: "#eee" }}>
      <Link to="/">Home</Link>
      <Link to="/adventure">Adventure</Link>
      <Link to="/profile">Profil</Link>
      <span style={{ marginLeft: "auto" }}>
        {user ? `Eingeloggt als ${user.username}` : ""}
      </span>
      <button onClick={handleLogout}>Logout</button>
    </nav>
  );
}
