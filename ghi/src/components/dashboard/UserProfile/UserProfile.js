import React from "react";
import "./UserProfile.css";

function UserProfile({ user }) {
  return (
    <div className="user-profile">
      <h2>Hello {user.username}!</h2>
      <p>Profile Picture</p>
      <img
        className="profile-img"
        src={user.picture_url}
        alt={`${user.username}'s profile`}
      />
      <p>Just some filler content.</p>
    </div>
  );
}

export default UserProfile;
