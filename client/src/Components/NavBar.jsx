import React from "react";

const NavBar = () => {
  return (
    <nav className="navbar navbar-expand-lg">
      <div className="container-fluid">
        <span className="navbar-brand">Form</span>
        <button className="navbar-toggler" type="button">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse">
          <ul className="navbar-nav">
            <li className="nav-item">
              <span className="nav-link">Home</span>
            </li>
            <li className="nav-item">
              <span className="nav-link">About</span>
            </li>
            <li className="nav-item">
              <span className="nav-link">Contact</span>
            </li>
          </ul>
        </div>
        <div className=" container d-flex justify-content-end">
          <button className="btn btn-primary mx-2">Login</button>
          <button className="btn btn-warning mx-2">Profile</button>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
