import React, { useEffect, useState } from "react";
import "./Cards.css";
import axios from "axios";

const Cards = () => {
  const [cardsimg, setcardsimg] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:8888/card").then((res) => {
      console.log(res.data);
      setcardsimg(res.data);
    });
  }, []);

  return (
    <div style={{ marginTop: "50px" }}>
      <center>
        <h2
          style={{
            wordSpacing: "10px",
            letterSpacing: "10px",
            fontWeight: "400",
          }}
        >
          SALE IS LIVE
        </h2>
      </center>
      <div className="cardcontainer">
        {cardsimg.map((item, index) => (
          <div className="card-box" key={index}>
            <img
              src={item.image}
              className="card-img-top"
              alt={`product${index}`}
            />
            <div>
              <p className="desc-container">{item.description}</p>
              <div className="price-container">
                <h5>₹{item.price}</h5>
                <p className="price-cont">₹{item.originalPrice}</p>
                <h5 style={{ color: "green" }}>{item.discount}% off</h5>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Cards;
