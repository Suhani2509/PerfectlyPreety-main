import React, { useEffect, useState } from "react";
import axios from "axios";

const UserCart = () => {
  const [userdashboard, setUserDashboard] = useState([]);
  const [quantities, setQuantities] = useState({});

  const FetchData = () => {
    axios.get("http://localhost:8888/userdashboard").then((res) => {
      setUserDashboard(res.data);
    });
  };

  useEffect(() => {
    FetchData();
  }, []);

  const handleQuantityChange = (id, newQty) => {
    const qty = Math.max(Number(newQty), 1);
    setQuantities((prev) => ({
      ...prev,
      [id]: qty,
    }));
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to remove this item?")) {
      axios
        .delete(`http://localhost:8888/userdashboard/${id}`)
        .then(() => {
          const updatedQuantities = { ...quantities };
          delete updatedQuantities[id];
          setQuantities(updatedQuantities);
          setUserDashboard((prev) => prev.filter((item) => item.id !== id));
        })
        .catch((err) => {
          console.error("Delete failed:", err);
          alert("Failed to remove item.");
        });
    }
  };

  return (
    <div className="container my-4">
      <h3 className="text-center mb-4">My Cart</h3>

      <table className="table table-bordered text-center align-middle shadow">
        <thead className="table-dark">
          <tr>
            <th>Sr No.</th>
            <th>Product</th>
            <th>Price</th>
            <th style={{ width: "180px" }}>Quantity</th>
            <th>Total</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {userdashboard.map((item, index) => {
            const qty = quantities[item.id] || 1;
            const total = item.price * qty;

            return (
              <tr key={item.id}>
                <td>{index + 1}</td>
                <td>
                  <img
                    src={item.image}
                    alt={item.name}
                    width={80}
                    className="img-thumbnail"
                  />
                </td>
                <td>₹{item.price}</td>
                <td>
                  <input
                    type="number"
                    value={qty}
                    min="1"
                    onChange={(e) =>
                      handleQuantityChange(item.id, e.target.value)
                    }
                    className="form-control text-center mx-auto"
                    style={{ width: "70px" }}
                  />
                </td>
                <td>₹{total}</td>
                <td>
                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() => handleDelete(item.id)}
                  >
                    Remove
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default UserCart;
