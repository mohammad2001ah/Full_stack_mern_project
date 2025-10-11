import React, { useState } from "react";
import "./signup.css";
import { useNavigate,NavLink } from "react-router-dom";
import axios from "axios";

export default function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const[message,setMessage]=useState("");

  const navigate = useNavigate();

  const handleRegister = async(e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://127.0.0.1:5000/api/users/create",
        {name,email,password}
      );
      setMessage(res.data.message);
      if(res.status===201){
        navigate("/Login");
        console.log("User registered successfully");
        
      };
    } catch (error) {
      if(error.response){
        setMessage(error.response.data.message);
      }
      else{
        setMessage("An error occurred. Please try again later.");
      }
    }
  };

  return (
    <div className="register-page">
      <div className="register-overlay">
        <div className="register-container">
          <h2>Create Your Account</h2>
          <form onSubmit={handleRegister}>
            <label>Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter your name"
              required
            />

            <label>Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              required
            />

            <label>Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              required
            />

            <button type="submit">Register</button>
          </form>

          <div className="social-login">
            <p>Or register with:</p>
            <div className="social-buttons">
              <button className="google-btn">Google</button>
              <button className="facebook-btn">Facebook</button>
            </div>
          </div>

          <p>
            Already have an account? <NavLink to='/login' className="login-link">Login</NavLink>
          </p>
        </div>
      </div>
    </div>
  );
}
