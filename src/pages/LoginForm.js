import React, { useState, useContext } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Usercontext } from "../users/Usercontext";

const Loginform = () => {
  const navigate = useNavigate();
  const { setUser } = useContext(Usercontext);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const res = await axios.post("http://127.0.0.1:8000/user/user-login/", {
        email,
        password,
      });

      console.log("Backend Response:", res.data); // 🔥 Debugging

      if (res.status === 200) {
        // ✅ Save user details in context
        setUser({
          id: res.data.user.id,
          email: res.data.user.email,
          username: res.data.user.username,
        });

        navigate("/"); // redirect to home
      } else {
        setError("Invalid email or password");
      }
    } catch (err) {
      console.error("Login Error:", err);
      setError("Invalid email or password");
    }
  };

  return (
    <div>
      <h2>Login</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <form onSubmit={handleLogin}>
        <input
          type="email"
          placeholder="Enter email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Enter password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Loginform;
