import React from 'react';
import { useCart, useDispatchCart } from '../components/ContextReducer';

export default function Cart() {
  let data = useCart();
  let dispatch = useDispatchCart();

  if (data.length === 0) {
    return (
      <div style={{ textAlign: 'center', marginTop: '5rem' }}>
        <div style={{ fontSize: '1.5rem', color: '#000' }}>The Cart is Empty!</div>
      </div>
    );
  }

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
    } else {
      console.error("Failed to place order:", response.status);
    }
  };

  let totalPrice = data.reduce((total, food) => total + food.price, 0);

  return (
    <div style={{ backgroundColor: '#f4f4f4', padding: '2rem', borderRadius: '8px', boxShadow: '0 4px 8px rgba(0,0,0,0.1)' }}>
      <div className='container m-auto mt-5 table-responsive table-responsive-sm table-responsive-md'>
        <table className='table table-hover' style={{ backgroundColor: '#fff', borderRadius: '8px', overflow: 'hidden' }}>
          <thead style={{ backgroundColor: '#e0e0e0', color: '#000' }}>
            <tr>
              <th scope='col'>#</th>
              <th scope='col'>Name</th>
              <th scope='col'>Quantity</th>
              <th scope='col'>Option</th>
              <th scope='col'>Amount</th>
              <th scope='col'></th>
            </tr>
          </thead>
          <tbody>
            {data.map((food, index) => (
              <tr key={index} style={{ backgroundColor: index % 2 === 0 ? '#fafafa' : '#fff' }}>
                <th scope='row' style={{ color: '#000' }}>{index + 1}</th>
                <td style={{ color: '#000' }}>{food.name}</td>
                <td style={{ color: '#000' }}>{food.qty}</td>
                <td style={{ color: '#000' }}>{food.size}</td>
                <td style={{ color: '#000' }}>{food.price}</td>
                <td>
                  <button
                    type="button"
                    className="btn btn-danger btn-sm"
                    onClick={() => dispatch({ type: "REMOVE", index })}
                    style={{ borderRadius: '20px', backgroundColor: '#dc3545', border: 'none', color: '#fff', padding: '0.25rem 0.75rem' }}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div style={{ marginTop: '1rem' }}>
          <h1 className='fs-2' style={{ color: '#000' }}>Total Price: {totalPrice}/-</h1>
        </div>
        <div style={{ marginTop: '2rem', textAlign: 'center' }}>
          <button className='btn' onClick={handleCheckOut} style={{ backgroundColor: '#28a745', color: '#fff', borderRadius: '20px', padding: '0.5rem 2rem', fontSize: '1rem', border: 'none' }}>
            Check Out
          </button>
        </div>
      </div>
    </div>
  );
}