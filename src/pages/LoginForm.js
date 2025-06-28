import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Loginform = () => {
  const userInputEmail = useRef();
  const userInputPassword = useRef();
  const [userdata, setuserdata] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("http://localhost:8888/loginuser")
      .then((res) => {
        setuserdata(res.data);
      })
      .catch((err) => {
        console.log("Error handle = ", err);
      });
  }, []);

  const Loginsubmit = (event) => {
    event.preventDefault();

    const useremail = userInputEmail.current.value;
    const userpass = userInputPassword.current.value;

    const currentuser = userdata.find(
      (val) => val.email === useremail && val.password === userpass
    );

    if (currentuser) {
      alert("Welcome to our cosmetic store 😊");
      sessionStorage.setItem("islogin", "true");
      navigate("/home");
    } else {
      alert("Sorry!! Invalid credentials 😭");
    }
  };

  return (
    <div
      style={{
        backgroundImage:'url("/assests/images/Card/loginbg.avif")',
        backgroundBlendMode:"screen",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <form onSubmit={Loginsubmit}>
        <div
          style={{
            width: "400px",
            backgroundColor: "rgba(255, 255, 255, 0.9)",
            boxShadow: "0px 0px 15px rgba(233, 30, 99, 0.3)",
            borderRadius: "12px",
            padding: "30px",
            textAlign: "center",
          }}
        >
          <h2 style={{ color: "#e91e63", textShadow: "1px 1px 2px #999" }}>
            Login to PrettyCosmetics
          </h2>
          <br />

          <div className="form-outline mb-4">
            <input
              ref={userInputEmail}
              type="text"
              placeholder="Enter your email"
              className="form-control"
              style={{ border: "2px solid #ce93d8", borderRadius: "6px" }}
              required
            />
          </div>

          <div className="form-outline mb-4">
            <input
              ref={userInputPassword}
              type="password"
              placeholder="Enter your password"
              className="form-control"
              style={{ border: "2px solid #ce93d8", borderRadius: "6px" }}
              required
            />
          </div>

          <button
            type="submit"
            className="btn btn-danger btn-block w-100"
            style={{
              backgroundColor: "#ff4d6d",
              border: "none",
              fontWeight: "bold",
              letterSpacing: "1px",
            }}
          >
            Sign In
          </button>
        </div>
      </form>
    </div>
  );
};

export default Loginform;
