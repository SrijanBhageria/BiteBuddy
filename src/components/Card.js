import React, { useState, useRef, useEffect } from "react";
import { useDispatchCart, useCart } from "./ContextReducer";

function Card(props) {
  
  let dispatch = useDispatchCart()
  let data = useCart()
  const priceRef = useRef()
  let options = props.options;
  let priceOptions = Object.keys(options);
  
  const [qty, setQty] = useState(1)
  const[size,setSize] = useState('')

  const handleAddToCart = async () => {
    let food = []
    for (const item of data) {
      if (item.id === props.foodItem._id) {
        food = item;
        break;
      }
    }
    if (food.length !== 0) {
      if (food.size === size) {
        await dispatch({ type: "UPDATE", id: props.foodItem._id, price: finalPrice, qty: qty })
        return
      }
      else if (food.size !== size) {
        await dispatch({ type: "ADD", id: props.foodItem._id, name: props.foodItem.name, price: finalPrice, qty: qty, size: size})
        return
      }
      return
    }
    await dispatch({ type: "ADD", id: props.foodItem._id, name: props.foodItem.name, price: finalPrice, qty: qty, size: size })
    // setBtnEnable(true)
  }
  // useEffect(()=>{
  // checkBtn();
  //   },[data])
  let finalPrice = qty * parseInt(options[size])
  
  useEffect(()=>{
    setSize(priceRef.current.value)
  },[])

  return (
    <div
      className="card mt-3"
      style={{
        width: "18rem",
        borderRadius: "1rem",
        overflow: "hidden",
        boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
        backgroundColor: "#f7f8fa",
        border: "none",
        display: "flex",
        flexDirection: "column",
        height: "100%", 
      }}
    >
      <img
        src={props.foodItem.img}
        className="card-img-top"
        alt="..."
        style={{
          borderBottom: "1px solid #eee",
          height: "180px",
          objectFit: "cover",
          width: "100%", 
        }}
      />
      <div
        className="card-body"
        style={{
          padding: "1rem",
          backgroundColor: "#f7f8fa",
          display: "flex",
          flexDirection: "column",
          flexGrow: 1, 
        }}
      >
        <div style={{ flexGrow: 1 }}>
          <h5
            className="card-title"
            style={{
              fontSize: "1.4rem",
              fontWeight: "600",
              marginBottom: "0.5rem", 
              color: "#333",
            }}
          >
            {props.foodItem.name}
          </h5>
          <p
            className="card-text"
            style={{
              fontSize: "0.95rem",
              color: "#666",
              marginBottom: "0.75rem", 
              lineHeight: "1.5",
            }}
          >
            Yumyyyy from BiteBuddy
          </p>
          <div
            className="d-flex align-items-center justify-content-between"
            style={{ gap: "0.5rem" }}
          >
            <select
              className="form-select"
              onChange={(e)=> setQty(e.target.value)}
              style={{
                backgroundColor: "#f8f9fa",
                color: "#333",
                border: "1px solid #ccc",
                padding: "0.5rem",
                width: "30%",
              }}
            >
              {Array.from(Array(6), (_e,i) => (
                <option key={i + 1} value={i + 1}>
                  {i + 1}
                </option>
              ))}
            </select>

            <select
              className="form-select"
              ref={priceRef}
              onChange={(e)=> setSize(e.target.value)}
              style={{
                backgroundColor: "#f8f9fa",
                color: "#333",
                border: "0.9px solid #ccc",
                padding: "0.5rem",
                width: "30%",
                
              }}
            >
              {priceOptions.map((data) => (
                <option key={data} value={data}>
                  {data}
                </option>
              ))}
            </select>

            <div
              className="fs-5"
              style={{
                color: "#333",
                fontWeight: "500",
                width: "40%",
                textAlign: "right",
              }}
            >
              ₹{finalPrice}/-
            </div>
          </div>
        </div>
        <hr
          style={{
            margin: "1rem 0", 
            borderTop: "2px solid #333", 
            width: "100%", 
          }}
        />
        <button
          className="btn btn-danger"
          style={{
            alignSelf: "flex-start", 
            marginTop: "auto", 
            marginBottom: "0.5rem", 
            padding: "0.5rem 1rem", 
          }}
          onClick={handleAddToCart}
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
}

export default Card;