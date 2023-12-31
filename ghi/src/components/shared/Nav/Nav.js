import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import "./Nav.css";

const Nav = () => {
  const location = useLocation();
  const navigate = useNavigate();

  async function logoutUser() {
    const url = `${process.env.REACT_APP_API_HOST}/token`;
    const fetchOptions = {
      credentials: "include",
      method: "DELETE",
    };
    const response = await fetch(url, fetchOptions);
    if (!response.ok) {
      console.log("An error occurred during logout");
    }
  }

  function handleLogout() {
    logoutUser();
    setTimeout(() => {
      navigate("/");
    }, 250);
  }

  if (location.pathname === "/" || location.pathname === "/signup") {
    return <></>;
  }

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-primary p-2">
      <div className="navbar-container">
        <Link className="navbar-brand" to="/dashboard">
          <img
            className="logo rounded-circle white-border"
            src="http://grapplingwithsyntax.com/side_scroll_paralax/NerdyBytesLogo.jpg"
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
            <Link className="nav-link" to="/dashboard">
              Dashboard
            </Link>
          </li>

          <li className="nav-item">
            <Link className="nav-link" to="/publicdeck">
              Public List
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/create-deck">
              Create Deck
            </Link>
          </li>
          <li className="nav-item" onClick={handleLogout}>
            <div className="nav-link" style={{ cursor: "pointer" }}>
              Logout
            </div>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Nav;
