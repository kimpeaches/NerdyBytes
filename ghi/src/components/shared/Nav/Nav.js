import React from "react";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
import "./Nav.css";

const Nav = () => {
  const location = useLocation();

  if (location.pathname === "/login") {
    return <></>;
  }

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-primary p-2">
      <div className="navbar-container">
        <Link className="navbar-brand" to="/">
          <img
            className="logo rounded-circle white-border"
            src="./NerdybytesLogo.jpg"
            alt="Nerdybytes Logo"
            width="100"
          />
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <ul className="navbar-nav navbar-list">
          <li className="nav-item active">
            <Link className="nav-link" to="/">
              Study
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/">
              Create Deck
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/">
              Edit Deck
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/">
              Logout
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Nav;
