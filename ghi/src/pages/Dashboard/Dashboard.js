import React, { useState, useEffect } from "react";
import { useAuthContext } from "@galvanize-inc/jwtdown-for-react";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";

import UserProfile from "../../components/dashboard/UserProfile/UserProfile";
import Calendar from "../../components/dashboard/Calendar/Calendar";
import UserDecks from "../../components/dashboard/UserDecks/UserDecks";

import "./Dashboard.css";

function Dashboard() {
  const { token } = useAuthContext();
  const [user, setUser] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    async function getUser() {
      if (token) {
        const decodedToken = jwtDecode(token);
        const userId = decodedToken.account.id;

        const url = `http://localhost:8000/api/user/${userId}`;
        const fetchOptions = {
          credentials: "include",
          method: "GET",
        };
        const response = await fetch(url, fetchOptions);
        if (response.ok) {
          const data = await response.json();
          setUser(data);
        } else {
          console.log("Error fetching user");
        }
      } else {
        navigate("/");
      }
    }

    getUser();
  }, [token, navigate]);

  return (
    <div className="dashboard-container">
      <h1>#1 This is the Dashboard Component</h1>
      <div className="d-flex">
        <UserProfile user={user} />
        <Calendar />
      </div>
      <UserDecks user={user} />
    </div>
  );
}

export default Dashboard;
