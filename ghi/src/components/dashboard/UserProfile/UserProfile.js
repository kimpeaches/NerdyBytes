import React from "react";
import "./UserProfile.css";
import { useUserContext } from "../../../useContext/UserContext";

function UserProfile() {
  const currentUser = useUserContext();

  return (
    <div className="user-profile">
      <div className="profile-content">
        <h2>Hello {currentUser.username}!</h2>
        <img
          className="profile-img"
          src={currentUser.picture_url}
          alt={`${currentUser.username}'s profile`}
        />
        <p>Profile Picture</p>
      </div>
    </div>
  );
}

export default UserProfile;
