import axios from 'axios'
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Get, Post } from '../utilities/HttpService (3)'

const UserRegister = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    contact: "",
    dob: "",
    gender: "",
    password: "",
    address: ""
  })
  const [showpassword,setpassword] = useState(false)
  const [errors, setErrors] = useState({})
  const navigate = useNavigate()

  const handleChange = (e) => {
    const {name,value} = e.target

    let Updatename = value
    if(name==="username"){
      Updatename = value.charAt(0).toUpperCase() + value.slice(1)
    }
    setFormData(prev => ({
      ...prev,
      [name]: Updatename
    }))
  }

  const validate = () => {
    const newErrors = {}
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    const passRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/
    const contactRegex = /^\d{10}$/

    if (!formData.username.trim()) newErrors.username = "Name is required"
    if (!formData.email) newErrors.email = "Email is required"
    else if (!emailRegex.test(formData.email)) newErrors.email = "Invalid email format"

    if (!formData.password) newErrors.password = "Password is required"
    else if (!passRegex.test(formData.password)) newErrors.password = "Password must have at least 6 characters, a letter and a number"

    if (!formData.contact) newErrors.contact = "Contact is required"
    else if (!contactRegex.test(formData.contact)) newErrors.contact = "Contact must be 10 digits"

    if (!formData.gender) newErrors.gender = "Please select a gender"
    if (!formData.address.trim()) newErrors.address = "Address is required"

    return newErrors
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const validationErrors = validate()

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors)
      return
    }

    try {
      const res = await Get(`http://127.0.0.1:8000/user/email-exist/?email=${formData.email}`)
      if (res.exists) {
        setErrors({ email: "Email is already registered!" })
        return
      }
      await Post("http://127.0.0.1:8000/user/register/", formData)
      alert("Registered Successfully!!")
      navigate("/login")
    } catch (err) {
      console.log("Registration Error= ", err)
      
      alert("Something went wrong while registering!")
    }
  }

  return (
    <div
      className="container-fluid"
      style={{
        minHeight: "100vh",
        background: "linear-gradient(to right, #f2d7f7ff, #efd8f3ff, #e9c9f0ff)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontFamily: "Poppins, sans-serif"
      }}
    >
      <div
        className="row w-100 shadow-lg rounded-4 overflow-hidden"
        style={{ maxWidth: "1000px", backgroundColor: "white" }}
      >
        <div className="col-md-6 p-5">
          <h3 className="text-center mb-4" style={{ color: "#7b1fa2", fontFamily: "Times New Roman" }}>
            Sign Up to PrettyCosmetics
          </h3>
          <form onSubmit={handleSubmit}>
            {errors.username && <p className="text-danger">{errors.username}</p>}
            <input
              type="text"
              name="username"
              placeholder="Enter your name"
              className="form-control mb-3"
              value={formData.username}
              onChange={handleChange}
              style={{ fontFamily: "Cursive" }}
            />

            {errors.email && <p className="text-danger">{errors.email}</p>}
            <input
              type="email"
              name="email"
              placeholder="Enter your email address"
              className="form-control mb-3"
              value={formData.email}
              onChange={handleChange}
              style={{ fontFamily: "Cursive" }}
            />

            {errors.password && <p className="text-danger">{errors.password}</p>}
            <div style={{ position: "relative" }} className="mb-3">
              <input
                type={showpassword ? "text" : "password"}
                name="password"
                placeholder="Enter your password"
                className="form-control"
                value={formData.password}
                onChange={handleChange}
                style={{ fontFamily: "Cursive", paddingRight: "40px" }} 
              />

              <button
                type="button"
                onClick={() => setpassword(!showpassword)}
                style={{
                  position: "absolute",
                  right: "10px",
                  top: "50%",
                  transform: "translateY(-50%)",
                  border: "none",
                  background: "transparent",
                  cursor: "pointer",
                  fontSize: "14px",
                  color: "#585e64ff"
                }}
              >
                {showpassword ? "Hide" : "Show"}
              </button>
            </div>


            {errors.contact && <p className="text-danger">{errors.contact}</p>}
            <input
              type="text"
              name="contact"
              placeholder="Enter 10-digit Contact Number"
              className="form-control mb-3"
              value={formData.contact}
              onChange={handleChange}
              style={{ fontFamily: "Cursive" }}
            />

            {errors.gender && <p className="text-danger">{errors.gender}</p>}
            <select
              name="gender"
              className="form-select mb-3"
              value={formData.gender}
              onChange={handleChange}
              style={{
                backgroundColor: "#f3e5f5",
                border: "2px solid #ce93d8",
                fontWeight: "500",
                fontFamily: "Cursive"
              }}
            >
              <option value="">Select Gender</option>
              <option value="female">Female</option>
              <option value="male">Male</option>
              <option value="other">Other</option>
            </select>

            {errors.address && <p className="text-danger">{errors.address}</p>}
            <textarea
              name="address"
              placeholder="Enter your full address"
              className="form-control mb-3"
              value={formData.address}
              onChange={handleChange}
              style={{ fontFamily: "Cursive" }}
            />

            <button
              type="submit"
              className="btn w-100"
              style={{
                backgroundColor: "#ab47bc",
                color: "white",
                fontWeight: "bold"
              }}
            >
              Register
            </button>

            <p className="text-center mt-3">
              Already have an account?{" "}
              <Link to="/login" style={{ color: "#8e24aa" }}>
                Login
              </Link>
            </p>
          </form>
        </div>

        <div
          className="col-md-6 d-none d-md-block"
          style={{
            backgroundImage: `url('/assests/images/Logo/cosmeticregister.jpg')`,
            backgroundSize: "cover",
            backgroundPosition: "center"
          }}
        />
      </div>
    </div>
  )
}

export default UserRegister
