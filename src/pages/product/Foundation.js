import React, { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../../components/common/Navbar";
import Footer from "../../components/common/Footer";
import { useNavigate } from "react-router-dom";

const Foundation = () => {
  const [foundationdata, setFoundationData] = useState([]);
  const [addedToCart, setAddedToCart] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    axios.get("http://localhost:8888/Foundation").then(res => {
      setFoundationData(res.data);
    });
  }, []);

  useEffect(() => {
    axios.get("http://localhost:8888/userdashboard").then(res => {
      const existingitem = res.data
      const cartMap = {};
      existingitem.forEach(item =>cartMap[item.id] = true)
      setAddedToCart(cartMap);
    });
  }, []);

  const handlecart = product => {
    axios.post("http://localhost:8888/userdashboard", product)
      .then(() => {
        setAddedToCart(prev => ({ ...prev, [product.id]: true }));
        alert("Product added successfully");
      })
      .catch(err => {
        console.error("Add to Cart Error:", err);
        alert("Failed to add product");
      });
  };

  return (
    <div style={{ backgroundColor: "#fff9c48c" }}>
      <Navbar />
      <img
        src="/assests/images/foundation/foundationbg.avif"
        className="w-100"
        alt="Foundation Banner"
      />

      <div className="container mt-5">
        <h3 className="text-center mb-4">BUY ONLINE FOUNDATION</h3>

        <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 g-4">
          {foundationdata.map(item => (
            <div className="col" key={item.id}>
              <div className="card h-100">
                <img
                  src={item.image}
                  className="card-img-top"
                  alt={item.description}
                  style={{ height: "220px", objectFit: "cover" }}
                />
                <div className="card-body d-flex flex-column">
                  <p className="text-center flex-grow-1" style={{ fontSize: "15px", fontWeight: 300 }}>
                    {item.description}
                  </p>
                  <div className="d-flex justify-content-between align-items-center">
                    <h5>₹{item.price}/-</h5>
                    <p className="text-muted text-decoration-line-through mb-0">₹{item.originalPrice}</p>
                    <span className="text-success">{item.discount}% off</span>
                  </div>
                  <button
                    className={"btn mt-3 " + (addedToCart[item.id] ? "btn-outline-danger" : "btn-danger")}
                    onClick={() =>
                      addedToCart[item.id]
                        ? navigate("/usercart")
                        : handlecart(item)
                    }
                  >
                    {addedToCart[item.id] ? "Go to Cart" : "Add to Cart"}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Foundation;
