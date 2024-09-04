import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function Signup() {
  const [credentials, setcredentials] = useState({
    name: "",
    email: "",
    password: "",
    geolocation: "",
  });
  
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Submitting:', credentials);
    try {
      const response = await fetch("http://localhost:5000/api/createuser", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: credentials.name,
          email: credentials.email,
          password: credentials.password,
          location: credentials.geolocation,
        }),
      });

      const json = await response.json();
      console.log(json);

      if (json.success) {
        // Redirect to login page on successful signup
        navigate("/login");
      } else {
        alert("Enter Valid Credentials");
      }
    } catch (error) {
      console.error("Error during submission:", error);
    }
  };

  const onChange = (e) => {
    setcredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  return (
    <div className="container-fluid p-0">
      <div className="row justify-content-center min-vh-100 d-flex align-items-center bg-gradient">
        <div className="col-md-6 col-lg-4">
          <div className="card shadow-sm border-0 rounded" style={{ backgroundColor: "#ffffff" }}>
            <div className="card-body p-4">
              <h3 className="card-title mb-4 text-center text-primary">
                Sign Up
              </h3>
              <form onSubmit={handleSubmit}>
                <div className="mb-3 text-dark">
                  <label htmlFor="name" className="form-label">
                    Name
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="name"
                    name="name"
                    value={credentials.name}
                    onChange={onChange}
                    placeholder="Enter your name"
                    style={{ backgroundColor: "#f7f7f7", borderColor: "#ced4da", color: "#000000" }} // Black text
                  />
                </div>
                <div className="mb-3 text-dark">
                  <label htmlFor="exampleInputEmail1" className="form-label">
                    Email address
                  </label>
                  <input
                    type="email"
                    className="form-control"
                    id="exampleInputEmail1"
                    name="email"
                    value={credentials.email}
                    aria-describedby="emailHelp"
                    onChange={onChange}
                    placeholder="Enter your email"
                    style={{ backgroundColor: "#f7f7f7", borderColor: "#ced4da", color: "#000000" }} // Black text
                  />
                  <div id="emailHelp" className="form-text">
                    We'll never share your email with anyone else.
                  </div>
                </div>
                <div className="mb-3 text-dark">
                  <label htmlFor="exampleInputPassword1" className="form-label">
                    Password
                  </label>
                  <input
                    type="password"
                    className="form-control"
                    id="exampleInputPassword1"
                    name="password"
                    value={credentials.password}
                    onChange={onChange}
                    placeholder="Enter your password"
                    style={{ backgroundColor: "#f7f7f7", borderColor: "#ced4da", color: "#000000" }} // Black text
                  />
                </div>
                <div className="mb-3 text-dark">
                  <label htmlFor="exampleInputAddress" className="form-label">
                    Address
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="exampleInputAddress"
                    name="geolocation"
                    value={credentials.geolocation}
                    onChange={onChange}
                    placeholder="Enter your address"
                    style={{ backgroundColor: "#f7f7f7", borderColor: "#ced4da", color: "#000000" }} // Black text
                  />
                </div>
                <div className="row">
                  <div className="col">
                    <button type="submit" className="btn btn-primary w-100">
                      Submit
                    </button>
                  </div>
                  <div className="col">
                    <Link to="/login" className="btn btn-danger w-100">
                      Already a user
                    </Link>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Signup;
