import React, { useState } from "react";
import "./login.css";
import axios from "axios";
import { useNavigate,NavLink } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [ message ,setMessage]=useState("");
  
    const navigate = useNavigate();
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://127.0.0.1:5000/api/users/login",
        {email,password}
      );
      setMessage(res.data.message);
      localStorage.setItem("token",res.data.token);
      localStorage.setItem("user",JSON.stringify(res.data.user));
      localStorage.setItem("role",res.data.role);
      if(res.status===200){
        if(res.data.role === 'admin'){
          navigate("/admin");
          console.log("Admin login successful");
        }
        // else{
        //   navigate("/user");
        // }
        console.log("Login Successful");
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
    <div className="login-page">
      <div className="login-overlay">
        <div className="login-container">
          <h2>Login to Your Account</h2>
          <form onSubmit={handleLogin}>
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

            <button type="submit">Login</button>
          </form>
          <p style={{ marginTop: '10px' }}>
            Don't have an account? 
            <NavLink to='/signup' className="signup-link" >
            Sign Up</NavLink>
          </p>
        </div>
      </div>
    </div>
  );
}
