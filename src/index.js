import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import reportWebVitals from "./reportWebVitals";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "./Layout";
import Home from "./components/Home.js";
import Login from "./components/Login";
import Signup from "./components/Signup.js";
import Cart from "./components/Cart.js";
import { CartProvider } from "./components/ContextReducer.js";
import "bootstrap-dark-5/dist/css/bootstrap-dark.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import MyOrder from "./components/MyOrder.js";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { 
        path: "", 
        element: <Home /> 
      },
      { 
        path: "login", 
        element: <Login /> 
      },
      { 
        path: "createuser", 
        element: <Signup /> 
      },
      { 
        path: "cart", 
        element: <Cart /> 
      },
      { 
        path: "myOrder", 
        element: <MyOrder />
      },
    ],
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <CartProvider>
      <RouterProvider router={router} />
    </CartProvider>
  </React.StrictMode>
);

reportWebVitals();
