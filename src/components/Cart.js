import React, { useState } from 'react';
import { useCart, useDispatchCart } from '../components/ContextReducer';
import { FaTrash } from 'react-icons/fa';

export default function Cart() {
  const [orderPlaced, setOrderPlaced] = useState(false); 
  const data = useCart();
  const dispatch = useDispatchCart();

  if (orderPlaced) {
    return (
      <div className="container text-center mt-5">
        <div className="alert alert-success fs-3 text-primary" role="alert">
          Order placed successfully!
        </div>
      </div>
    );
  }

  if (data.length === 0) {
    return (
      <div className="container text-center mt-5">
        <div className="alert alert-secondary fs-3 text-primary" role="alert">
          The Cart is Empty!
        </div>
      </div>
    );
  }

  const handleRemove = (index) => {
    dispatch({ type: "REMOVE", index });
  };

  const handleCheckOut = async () => {
    let userEmail = localStorage.getItem("userEmail");

    let response = await fetch("http://localhost:5000/api/orderData", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        order_data: data,
        email: userEmail,
        order_date: new Date().toDateString()
      })
    });

    if (response.status === 200) {
      dispatch({ type: "DROP" });
      setOrderPlaced(true); 
    } else {
      console.error("Failed to place order:", response.status);
    }
  };

  const totalPrice = data.reduce((total, food) => total + food.price, 0);

  return (
    <div className="container my-5">
      <div className="table-responsive">
        <table className="table table-hover table-striped">
          <thead className="table-primary text-primary">
            <tr>
              <th scope="col">#</th>
              <th scope="col">Name</th>
              <th scope="col">Quantity</th>
              <th scope="col">Option</th>
              <th scope="col">Amount</th>
              <th scope="col"></th>
            </tr>
          </thead>
          <tbody>
            {data.map((food, index) => (
              <tr key={food.id}>
                <th scope="row">{index + 1}</th>
                <td className="text-primary">{food.name}</td>
                <td className="text-primary">{food.qty}</td>
                <td className="text-primary">{food.size}</td>
                <td className="text-primary">₹{food.price}</td>
                <td>
                  <button
                    type="button"
                    className="btn p-0"
                    onClick={() => handleRemove(index)}
                    style={{ border: 'none', background: 'transparent', cursor: 'pointer', color: '#dc3545' }}
                  >
                    <FaTrash size={20} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="text-center my-4 text-primary">
        <h1 className="fs-2">Total Price: ₹{totalPrice}/-</h1>
        <button className="btn btn-success mt-3" onClick={handleCheckOut}>Check Out</button>
      </div>
    </div>
  );
}
