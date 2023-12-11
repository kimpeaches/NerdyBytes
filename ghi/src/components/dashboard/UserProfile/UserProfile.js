import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./UserProfile.css";

function UserProfile({ user }) {
  const [isEditing, setIsEditing] = useState(false);
  const [username, setUsername] = useState(user.username);
  const navigate = useNavigate();

  const handleEditClick = () => {
    navigate("/UserEdit");
  };

  return (
    <div className="user-profile">
      <div className="profile-content">
        {isEditing ? (
          <>
            <input
              type="text"
              value={user.username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <button onClick={() => setIsEditing(false)}>Save</button>
          </>
        ) : (
          <>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <h2>Hello {user.username}!</h2>
              <img
                className="profile-img"
                src={user.picture_url}
                alt={`${user.username}'s profile`}
              />
              <div>
                <p>Profile Picture</p>
                <button onClick={handleEditClick}>Edit</button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default UserProfile;
