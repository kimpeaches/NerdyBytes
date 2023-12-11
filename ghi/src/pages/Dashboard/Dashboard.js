import React, { useState, useEffect } from "react";
import { useAuthContext } from "@galvanize-inc/jwtdown-for-react";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";

import Calendar from "../../components/dashboard/Calendar/Calendar";
import UserDecks from "../../components/dashboard/UserDecks/UserDecks";
import UserProfile from "../../components/dashboard/UserProfile/UserProfile";
import checkIn from "../../utils/checkIn";

import "./Dashboard.css";

function Dashboard() {
  const { token } = useAuthContext();
  const [user, setUser] = useState({});
  const navigate = useNavigate();

  if (!token) {
    navigate("/");
  }

  useEffect(() => {
    async function getUser() {
      if (token) {
        const decodedToken = jwtDecode(token);
        const userId = decodedToken.account.id;

        const url = `${process.env.REACT_APP_API_HOST}/api/user/${userId}`;
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
      }
    }

    getUser();
  }, [token]);

  checkIn(user);

  return (
    <div className="dashboard-container">
      <div className="d-flex">
        <UserProfile user={user} />
        <Calendar user={user} />
      </div>
      <UserDecks user={user} />
    </div>
  );
}

export default Dashboard;
