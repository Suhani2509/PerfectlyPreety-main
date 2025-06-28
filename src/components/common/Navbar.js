import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import axios from "axios";

const Navbar = () => {
  const [productcount,setproductcount] = useState()

  useEffect(()=>{
    axios.get("http://localhost:8888/userdashboard").then((res)=>{
      setproductcount(res.data.length)
    }).catch((err)=>{
       console.log("Error",err)
    })
  },[])


  return (
    <nav
      className="navbar navbar-expand-lg navbar-light px-4 py-3 shadow-sm"
      style={{ backgroundColor: "#eceff185" }}
    >
      <Link className="navbar-brand d-flex align-items-center" to="/">
        <img
          alt="Logo"
          src="/assests/images/Logo/logo.png"
          style={{ height: "60px", objectFit: "contain" }}
        />
      </Link>

      <button
        className="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarNavDropdown"
        aria-controls="navbarNavDropdown"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon"></span>
      </button>

      <div
        className="collapse navbar-collapse justify-content-end"
        id="navbarNavDropdown"
      >
        <ul className="navbar-nav align-items-center">
          <li className="nav-item mx-2">
            <Link className="nav-link fw-semibold text-uppercase" to="/home">
              Home
            </Link>
          </li>

          <li className="nav-item dropdown mx-2">
            <Link
              className="nav-link dropdown-toggle fw-semibold text-uppercase"
              to="#"
              id="navbarDropdown"
              role="button"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              Products
            </Link>
            <ul
              className="dropdown-menu border-0 shadow"
              aria-labelledby="navbarDropdown"
            >
              <li>
                <Link
                  to="/lipstick"
                  className="dropdown-item fw-semibold text-dark"
                >
                  Lipstick
                </Link>
              </li>
              <li>
                <Link
                  className="dropdown-item fw-semibold text-dark"
                  to="/blush"
                >
                  Blush
                </Link>
              </li>
              <li>
                <Link
                  className="dropdown-item fw-semibold text-dark"
                  to="/foundation"
                >
                  Foundation
                </Link>
              </li>
              <li>
                <Link
                  className="dropdown-item fw-semibold text-dark"
                  to="/eyeshadow"
                >
                  Eyeshadow
                </Link>
              </li>
            </ul>
          </li>

          <li className="nav-item mx-2">
            <Link className="nav-link fw-semibold text-uppercase" to="/about">
              About us
            </Link>
          </li>

          <li className="nav-item mx-2">
            <Link className="nav-link fw-semibold text-uppercase" to="/contact">
              Contact
            </Link>
          </li>
        </ul>
        <Link to="/usercart">
          <ShoppingCartOutlinedIcon style={{color:"crimson", fontSize: "30px"}} /><div 
          style={{textDecoration:"none" ,background: "crimson",borderRadius: "50px",color: "white",padding: ".5px 8px",fontWeight: "bold",textDecoration: "none",display: "inline-block" }}>{productcount}</div>
          {/* <span style={{backgroundColor:"crimson",borderRadius:"100px", color:"white", padding:"1px 7px", margin:"0 10px 10px 0", textDecoration:"none"}}>{productcount}</span> */}
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
