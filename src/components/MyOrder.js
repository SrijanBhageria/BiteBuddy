import React, { useState, useEffect } from "react";

export default function MyOrder() {
  const [orderData, setOrderData] = useState([]);

  useEffect(() => {
    fetchMyOrder();
  }, []);

  const fetchMyOrder = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/myOrderData", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: localStorage.getItem("userEmail") }),
      });

      if (response.ok) {
        const data = await response.json();
        console.log("Full Fetched Data:", data);

        const orderDataArray = data.orderData?.order_data;

        console.log("order_data:", orderDataArray);

        if (Array.isArray(orderDataArray) && orderDataArray.length > 0) {
          setOrderData(orderDataArray);
        } else {
          console.warn("Order data is empty or not an array");
        }
      } else {
        console.error("Failed to fetch orders:", response.statusText);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

return (
  <div
    className="container"
    style={{
      backgroundImage: `url('https://img.freepik.com/free-photo/macro-tropical-fruit-texture_23-2148131941.jpg?size=626&ext=jpg&ga=GA1.1.159757594.1724008012&semt=ais_hybrid')`,
      backgroundSize: "cover",
      backgroundPosition: "center",
      minHeight: "100vh",
      paddingTop: "20px",
    }}
  >
    <div className="row">
      {orderData.length > 0 ? (
        orderData.map((order, index) => {
          const totalAmount = order.slice(1).reduce((sum, item) => sum + item.price, 0);

          return (
            <div key={index} className="col-12 col-md-6 col-lg-4 mb-4">
              <div 
              className="card h-100 shadow-sm"
              style={{backgroundColor: "white"}}
              >
                <h5 className="card-header bg-primary text-#293241">
                  Order Date: {order[0]?.Order_date || "No Date Available"}
                </h5>
                <div className="card-body text-black">
                  {order.slice(1).map((item, idx) => (
                    <div key={idx} className="mb-3">
                      <h5 className="card-title mt-2">{item.name}</h5>
                      <div className="d-flex justify-content-between">
                        <span>Qty: {item.qty}</span>
                        <span>Size: {item.size}</span>
                      </div>
                      <div className="text-end text-danger fw-bold">
                        ₹{item.price}/-
                      </div>
                    </div>
                  ))}
                </div>
                <hr style={{ borderTop: '1px solid black', margin: '1rem 0' }} />
                <div className="card-footer text-end text-black">
                  <h6 className="fw-bold">Total: ₹{totalAmount}/-</h6>
                </div>
              </div>
            </div>
          );
        })
      ) : (
        <p className="text-center text-black fs-4">No orders found.</p>
      )}
    </div>
  </div>
);
}