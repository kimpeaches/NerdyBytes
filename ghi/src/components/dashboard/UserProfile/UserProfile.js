import React from "react";
import "./UserProfile.css";

function UserProfile({ user }) {
  return (
    <div className="user-profile">
      <div className="profile-content">
        <h2>Hello {user.username}!</h2>
        <img
          className="profile-img"
          src={user.picture_url}
          alt={`${user.username}'s profile`}
        />
        <p>Profile Picture</p>
      </div>
    </div>
  );
}

export default UserProfile;
