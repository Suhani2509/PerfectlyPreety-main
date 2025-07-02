import React, { useEffect, useState } from "react";
import axios from "axios";
import Footer from "../../components/common/Footer";
import Navbar from "../../components/common/Navbar";
import { useNavigate } from "react-router-dom";

const Lipstick = () => {
  const [lipstickData, setLipstickData] = useState([]);
  const [addedToCart, setAddedToCart] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    axios.get("http://localhost:8888/lipstick").then((res) => {
      setLipstickData(res.data);
    });
  }, []);

  useEffect(() => {
    axios.get("http://localhost:8888/userdashboard").then((res) => {
      const existingitem = res.data
      const cartMap = {};
      existingitem.forEach(item => cartMap[item.id] = true);
      setAddedToCart(cartMap);
    });
  }, []);

  const handleAddToCart = (product) => {
    axios.post("http://localhost:8888/userdashboard", product).then(() => {
        setAddedToCart(prev => ({ ...prev, [product.id]: true }));
        alert("Product added successfully");
      })
      .catch(err => {
        console.error("Add to Cart Error:", err);
        alert("Failed to add product");
      });
  };

  return (
    <div style={{ backgroundColor: "rgb(255 24 24 / 32%)" }}>
      <Navbar />
      <img
        src="/assests/images/lipstick/lipstickbg.avif"
        className="w-100"
        alt="Lipstick Banner"
      />

      <div className="container mt-5">
        <h3 className="text-center mb-4">All Products</h3>

        <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 g-4">
          {lipstickData.map(item => (
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
                    <p className="text-muted text-decoration-line-through mb-0">
                      ₹{item.originalPrice}
                    </p>
                    <span className="text-success">
                      {item.discount}% off
                    </span>
                  </div>
                  <button
                    className={"btn mt-3 " + (addedToCart[item.id] ? "btn-outline-danger" : "btn-danger")}
                    onClick={() =>
                      addedToCart[item.id]
                        ? navigate("/usercart")
                        : handleAddToCart(item)
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

export default Lipstick;
