import React, {useState} from 'react'
import { Link, useNavigate } from 'react-router-dom'

function Features() {
    
    const [credentials, setcredentials] = useState({
        email: "",
        password: "",
      });
    let navigate  = useNavigate()
      const handleSubmit = async (e) => {
        e.preventDefault();
        console.log('Submitting:', credentials);
        try {
            const response = await fetch("http://localhost:5000/api/loginuser", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                email: credentials.email,
                password: credentials.password,
              }),
            });
      
            const json = await response.json();
            console.log(json);

            if (!json.success) {
              alert("Enter Valid Credentials");
            }
            if(json.success){
              localStorage.setItem("userEmail",credentials.email)
                localStorage.setItem("authToken",json.authToken)
                console.log(localStorage.getItem("authToken"));
                
                navigate('/')
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
      <div className="row justify-content-center min-vh-100 d-flex align-items-center">
        <div className="col-md-6 col-lg-4">
          <div className="card shadow-lg border-0 rounded p-4" style={{ backgroundColor: "#ffffff" }}>
            <div className="card-body">
              <h3 className="card-title mb-4 text-center text-primary">
                Login
              </h3>
              <form onSubmit={handleSubmit}>
                
                <div className="mb-3">
                  <label htmlFor="exampleInputEmail1" className="form-label text-dark" >
                    Email address
                  </label>
                  <input
                    type="email"
                    className="form-control text-black"
                    id="exampleInputEmail1"
                    name="email"
                    value={credentials.email}
                    aria-describedby="emailHelp"
                    onChange={onChange}
                    placeholder="Enter your email"
                    style={{ backgroundColor: "#f8f9fa", color: "#495057", borderColor: "#ced4da" }}
                  />
                  <div id="emailHelp" className="form-text">
                    We'll never share your email with anyone else.
                  </div>
                </div>
                <div className="mb-3">
                  <label htmlFor="exampleInputPassword1" className="form-label text-dark">
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
                    style={{ backgroundColor: "#f8f9fa", color: "#495057", borderColor: "#ced4da", text:'#000000'}}
                  />
                </div>
                
                <div className="d-flex justify-content-between align-items-center">
                  <button type="submit" className="btn btn-primary">
                    Submit
                  </button>
                  <Link to="/createuser" className="btn btn-danger">
                    I'm a new User
                  </Link>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
    );
  }

export default Features
