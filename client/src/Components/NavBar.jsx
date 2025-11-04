import React from "react";
import "../styles/NavBar.css";
import profilePic from "../assets/profile-pic.jpg";
import { useNavigate } from "react-router-dom";

const NavBar = () => {
    const navigate = useNavigate()
  return (
    <div>
      <nav className="navbar navbar-expand-lg bg-body-tertiary">
        <div className="container-fluid">
          <a className="navbar-brand" style={{cursor:'pointer'}} onClick={()=>navigate('/')}>
            Dashboard
          </a>
          <button className="navbar-toggler" type="button">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav">
              <li className="nav-item" onClick={()=>navigate('/')}>
                <a className="nav-link" aria-current="page">
                  Home
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link">
                  Chat
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="profile"
        onClick={()=>navigate('/profile')}>
          <img src={profilePic} height={50} width={50} />
          <p>Profile</p>
        </div>
      </nav>
    </div>
  );
};

export default NavBar;
