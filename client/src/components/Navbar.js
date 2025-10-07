import { NavLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass, faUser } from "@fortawesome/free-solid-svg-icons";
import "./navbar.css";

export default function Navbar() {
  return (
    <nav className="navbar navbar-expand-lg navbar-light">
      <div className="container-fluid">

        {/* Logo */}
        <NavLink className="navbar-brand" to="/">My STORE</NavLink>

        {/* Mobile Toggle */}
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* Navbar Links + Icons */}
        <div className="collapse navbar-collapse justify-content-center" id="navbarSupportedContent">
          
          {/* Links */}
          <ul className="navbar-nav mb-2 mb-lg-0">
            <li className="nav-item"><NavLink className="nav-link" to="/">HOME</NavLink></li>
            <li className="nav-item"><NavLink className="nav-link" to="/collection">COLLECTION</NavLink></li>
            <li className="nav-item"><NavLink className="nav-link" to="/about">ABOUT</NavLink></li>
            <li className="nav-item"><NavLink className="nav-link" to="/contact">CONTACT</NavLink></li>
          </ul>

          {/* Search Icon */}
          <div className="d-flex search mx-2" style={{ cursor: "pointer" }}>
            <FontAwesomeIcon icon={faMagnifyingGlass} />
          </div>

          {/* User Dropdown */}
          <div className="dropdown">
            <div
              className="d-flex user mx-2 my-2"
              style={{ cursor: "pointer" }}
              data-bs-toggle="dropdown"
            >
              <FontAwesomeIcon icon={faUser} />
            </div>
            <ul className="dropdown-menu dropdown-menu-end " style={{cursor: "pointer",marginTop:"10px"}}>
              <li><a className="dropdown-item">My Profile</a></li>
              <li><a className="dropdown-item">Orders</a></li>
              <li><a className="dropdown-item">Logout</a></li>
            </ul>
          </div>
        </div>
        <link to='/cart' className="relative">
        </link>
      </div>
    </nav>
  );
}
