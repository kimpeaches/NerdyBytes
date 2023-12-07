import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import "./Nav.css";

const Nav = () => {
    const location = useLocation();
    const navigate = useNavigate();

    async function logoutUser() {
        const url = "http://localhost:8000/token";
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

    if (location.pathname === "/") {
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
                        <Link className="nav-link" to="#">
                            Study
                        </Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to="/chat/1">
                            Chat
                        </Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to="#">
                            Create Deck
                        </Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to="/publicdeck">
                            Public List
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
