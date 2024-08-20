import React, { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import Badge from 'react-bootstrap/Badge';
import Modal from "../Modal";
import Cart from "./Cart";
import { useCart } from "./ContextReducer";

function Navbar() {
  const [cartView, setCartView] = useState(false);
  let data = useCart()
  const navigate = useNavigate();
  const isAuthenticated = !!localStorage.getItem("authToken");

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    navigate('/login');
  };

  return (
    <nav
      style={{
        backgroundColor: "#5e261c",
        padding: "15px 30px",
        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
      }}
      className="navbar navbar-expand-lg navbar-dark"
    >
      <div className="container-fluid">
        <Link
          style={{
            color: "#ffffff",
            fontSize: "1.5rem",
            fontWeight: "700",
            letterSpacing: "2px",
            textTransform: "uppercase",
            textShadow: "2px 2px 4px rgba(0, 0, 0, 0.5)",
            transition: "color 0.3s ease, transform 0.3s ease",
            display: "inline-block",
          }}
          className="navbar-brand"
          to="/"
          onMouseEnter={(e) => {
            e.target.style.color = "#ffd700";
            e.target.style.transform = "scale(1.1)";
          }}
          onMouseLeave={(e) => {
            e.target.style.color = "#ffffff";
            e.target.style.transform = "scale(1)";
          }}
        >
          BiteBuddy
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav me-auto">
            <li className="nav-item">
              <NavLink
                to="/"
                className="nav-link"
                style={{fontSize: "1rem",
                    fontWeight: "700",
                    letterSpacing: "2px",
                    textTransform: "uppercase",
                    textShadow: "2px 2px 4px rgba(0, 0, 0, 0.5)",
                    transition: "color 0.3s ease, transform 0.3s ease",
                    display: "inline-block",
                }}
                onMouseEnter={(e) => {
                    e.target.style.color = "#008080";
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.color = "#ffffff";
                  }}
              >
                Home
              </NavLink>
            </li>
          </ul>
          <ul className="navbar-nav ms-auto">
            {isAuthenticated && (
              <li className="nav-item">
                <NavLink
                  to="/cart"
                  className="nav-link"
                  style={{fontSize: "1rem",
                    fontWeight: "700",
                    letterSpacing: "2px",
                    textTransform: "uppercase",
                    textShadow: "2px 2px 4px rgba(0, 0, 0, 0.5)",
                    transition: "color 0.3s ease, transform 0.3s ease",
                    display: "inline-block",
                }}
                onMouseEnter={(e) => {
                    e.target.style.color = "#008080";
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.color = "#ffffff";
                  }}
                  onClick={() => {setCartView(true)}}
                >
                  My Cart 
                  <Badge pill bg='danger'>{data.length}</Badge>
                </NavLink>
                {cartView && (
                  <Modal onClose={() => setCartView(false)}>
                    <Cart />
                  </Modal>
                )}
              </li>
            )}
            {!isAuthenticated ? (
              <>
                <li className="nav-item">
                  <NavLink
                    to="/login"
                    className="nav-link"
                    style={{
                        fontSize: "1rem",
                        fontWeight: "700",
                        letterSpacing: "2px",
                        textTransform: "uppercase",
                        textShadow: "2px 2px 4px rgba(0, 0, 0, 0.5)",
                        transition: "color 0.3s ease, transform 0.3s ease",
                        display: "inline-block",
                    }}
                    onMouseEnter={(e) => {
                        e.target.style.color = "#008080";
                      }}
                      onMouseLeave={(e) => {
                        e.target.style.color = "#ffffff";
                      }}
                  >
                    Login
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink
                    to="/createuser"
                    className="nav-link"
                    style={{
                        fontSize: "1rem",
                        fontWeight: "700",
                        letterSpacing: "2px",
                        textTransform: "uppercase",
                        textShadow: "2px 2px 4px rgba(0, 0, 0, 0.5)",
                        transition: "color 0.3s ease, transform 0.3s ease",
                        display: "inline-block",
                    }}
                    onMouseEnter={(e) => {
                        e.target.style.color = "#008080";
                      }}
                      onMouseLeave={(e) => {
                        e.target.style.color = "#ffffff";
                      }}
                  >
                    Sign Up
                  </NavLink>
                </li>
              </>
            ) : (
              <li className="nav-item">
                <div
                  className="nav-link"
                  style={{
                    fontSize: "1rem",
                    fontWeight: "700",
                    letterSpacing: "2px",
                    textTransform: "uppercase",
                    textShadow: "2px 2px 4px rgba(0, 0, 0, 0.5)",
                    transition: "color 0.3s ease, transform 0.3s ease",
                    display: "inline-block",
                }}
                onMouseEnter={(e) => {
                    e.target.style.color = "#008080";
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.color = "#ffffff";
                  }}
                  onClick={handleLogout}
                >
                  Logout
                </div>
              </li>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
