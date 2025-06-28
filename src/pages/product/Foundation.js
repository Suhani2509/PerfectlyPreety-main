import React, { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../../components/common/Navbar";
import Footer from "../../components/common/Footer";
import { useNavigate } from "react-router-dom";

const Foundation = () => {
  const [foundationdata, setfoundationdata] = useState([]);
  const [addedToCart, setAddedToCart] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    axios.get("http://localhost:8888/Foundation").then((res) => {
      setfoundationdata(res.data);
    });
  }, []);

  // Fetch existing cart items on mount
  useEffect(() => {
    axios.get("http://localhost:8888/userdashboard").then((res) => {
      const existingItems = res.data;
      const cartMap = {};
      existingItems.forEach((item) => {
        cartMap[item.id] = true;
      });
      setAddedToCart(cartMap);
    });
  }, []);

  const handlecart = (product) => {
    axios
      .post(`http://localhost:8888/userdashboard`, product)
      .then((res) => {
        alert("Product added successfully");
      })
      .catch((err) => {
        console.error("Add to Cart Error:", err);
        alert("Failed to add product");
      });
  };
  return (
    <div style={{ backgroundColor: "#fff9c48c" }}>
      <Navbar />
      <img
        src="/assests/images/foundation/foundationbg.avif"
        className="w-100 d-block"
        alt="Lipstick Banner"
      />

      <div className="container mt-5">
        <h3 className="text-center mb-4">BUY ONLINE FOUNDATION</h3>

        <div className="row g-4 justify-content-center">
          {foundationdata.map((item) => (
            <div className="col-md-3" key={item.id}>
              <div className="card border-0 p-0">
                <img
                  src={item.image}
                  className="card-img-top"
                  alt={item.description}
                  style={{ height: "220px", objectFit: "cover" }}
                />
                <div className="card-body p-2">
                  <p
                    className="text-center"
                    style={{ fontSize: "15px", fontWeight: "300" }}
                  >
                    {item.description}
                  </p>
                  <h5 className="d-inline">₹{item.price}/-</h5>
                  <p
                    className="d-inline ms-2 text-muted"
                    style={{ textDecoration: "line-through" }}
                  >
                    ₹{item.originalPrice}
                  </p>
                  <h6 className="d-inline text-success float-end">
                    {item.discount}% off
                  </h6>
                  <div className="text-center mt-2">
                    {addedToCart[item.id] ? (
                      <button
                        className="btn btn-outline-success"
                        onClick={() => navigate("/usercart")}
                      >
                        Go to Cart
                      </button>
                    ) : (
                      <button
                        className="btn"
                        style={{
                          backgroundColor: "rgb(209 0 118)",
                          color: "white",
                        }}
                        onClick={() => handlecart(item)}
                      >
                        Add to Cart
                      </button>
                    )}
                  </div>
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
