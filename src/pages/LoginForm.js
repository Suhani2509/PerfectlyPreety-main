import React, { useRef, useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

const Loginform = () => {
  const userInputEmail = useRef();
  const userInputPassword = useRef();
  const [errors, setErrors] = useState({});
  const [loginError, setLoginError] = useState("");
  const navigate = useNavigate();

  const validate = (email, password) => {
    const newErrors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email) newErrors.email = "Email is required.";
    else if (!emailRegex.test(email)) newErrors.email = "Enter a valid email.";

    if (!password) newErrors.password = "Password is required.";
    return newErrors;
  };

  const Loginsubmit = async (e) => {
    e.preventDefault();

    const email = userInputEmail.current.value.trim();
    const password = userInputPassword.current.value.trim();

    const validationErrors = validate(email, password);
    setErrors(validationErrors);
    setLoginError("");

    if (Object.keys(validationErrors).length === 0) {
      try {
        const res = await axios.post("http://127.0.0.1:8000/user/user-login/", {
          email,
          password,
        });

        sessionStorage.setItem("islogin", true);
        sessionStorage.setItem("username", res.data.username);

        alert("Login successful! ✔");
        navigate("/");
      } catch (err) {
        setLoginError("Invalid email or password.");
      }
    }
  };


  return (
    <div
      className="d-flex justify-content-center align-items-center min-vh-100"
      style={{
        backgroundImage: 'url("/assests/images/Card/loginbg.avif")',
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <form onSubmit={Loginsubmit} className="bg-white p-4 p-md-5 rounded-4 shadow" style={{ maxWidth: "420px", width: "100%" }}>
        <h3 className="text-center mb-4" style={{ color: "#e91e63" }}>
          Login to <strong>PrettyCosmetics</strong>
        </h3>

        {loginError && (
          <div className="alert alert-danger py-2 text-center">{loginError}</div>
        )}

        <div className="mb-3">
          <input
            ref={userInputEmail}
            type="email"
            placeholder="Enter your email"
            className={`form-control ${errors.email ? "is-invalid" : ""}`}
          />
          {errors.email && <div className="invalid-feedback">{errors.email}</div>}
        </div>

        <div className="mb-3">
          <input
            ref={userInputPassword}
            type="password"
            placeholder="Enter your password"
            className={`form-control ${errors.password ? "is-invalid" : ""}`}
          />
          {errors.password && <div className="invalid-feedback">{errors.password}</div>}
        </div>

        <button
          type="submit"
          className="btn btn-danger w-100 fw-semibold"
          style={{ backgroundColor: "#ff4d6d", border: "none" }}
        >
          Sign In
        </button>

        <div className="d-flex justify-content-between mt-3 small">
          <Link to="/userregister" className="text-decoration-none">Not registered yet?</Link>
          <Link to="/adminlogin" className="text-decoration-none">Login as Admin</Link>
        </div>
      </form>
    </div>
  );
};

export default Loginform;
