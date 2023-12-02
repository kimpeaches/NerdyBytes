import React from "react";
import "./Dashboard.css";
import UserProfile from "../../components/dashboard/UserProfile/UserProfile";
import Calendar from "../../components/dashboard/Calendar/Calendar";
import UserDecks from "../../components/dashboard/UserDecks/UserDecks";

function Dashboard() {
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
