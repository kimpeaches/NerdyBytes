import React, { useContext } from "react";
import UserContext from "../../../contexts/UserContext";
import "./UserProfile.css";

function UserProfile() {
  const { user } = useContext(UserContext);

  if (!user) {
    return <div>Loading...</div>;
  }

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
