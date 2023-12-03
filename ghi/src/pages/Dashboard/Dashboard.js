import React from "react";
import "./Dashboard.css";
import UserProfile from "../../components/dashboard/UserProfile/UserProfile";
import Calendar from "../../components/dashboard/Calendar/Calendar";
import UserDecks from "../../components/dashboard/UserDecks/UserDecks";
import { useAuthContext } from "@galvanize-inc/jwtdown-for-react";
import { useNavigate } from "react-router-dom";

function Dashboard() {
  const { token } = useAuthContext();
  const navigate = useNavigate();

  if (!token) {
    navigate("/login");
  }

  return (
    <div className="dashboard-container">
      <h1>#1 This is the Dashboard Component</h1>
      <div className="d-flex">
        <UserProfile />
        <Calendar />
      </div>
      <UserDecks />
    </div>
  );
}

export default Dashboard;
