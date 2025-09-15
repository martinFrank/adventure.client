import { useState } from "react";
import axios from "axios";
import { useAuth } from "./AuthContext";
import { useNavigate } from "react-router-dom";

export default function LoginPage() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const { login } = useAuth();
    const navigate = useNavigate();

    //   const handleSubmit = async (e: React.FormEvent) => {
    //     e.preventDefault();
    //     const res = await axios.post("http://localhost:8080/api/auth/login", {
    //       username,
    //       password,
    //     });
    //     login(res.data.token);
    //     navigate("/");
    //   };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            //const res = await axios.post("/auth/login", { username, password });
            const res = await axios.post("http://localhost:8080/api/auth/login", { username, password });
            //const res = await axios.post("http://192.168.0.24:8080/api/auth/login", { username, password });
            //const res = await axios.post("http://backend/api/auth/login", { username, password });
            //const res = await axios.post("https://localhost:8443/api/auth/login", { username, password });
            login(res.data.token); // <- muss aufgerufen werden
            navigate("/");
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <input value={username} onChange={e => setUsername(e.target.value)} placeholder="Username" />
            <input value={password} onChange={e => setPassword(e.target.value)} placeholder="Password" type="password" />
            <button type="submit">Login</button>
        </form>
    );
}
