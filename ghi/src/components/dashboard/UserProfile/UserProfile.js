import React, { useState, useEffect } from "react";
import { useAuthContext } from "@galvanize-inc/jwtdown-for-react";
import { jwtDecode } from "jwt-decode";
import "./UserProfile.css";

function UserProfile() {
  const { token } = useAuthContext();
  const [user, setUser] = useState({});

  useEffect(() => {
    async function getUser() {
      if (token) {
        const decodedToken = jwtDecode(token);
        const userId = decodedToken.account.id;

        const url = `http://localhost:8000/api/user/${userId}`;
        const fetchOptions = {
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: "application/json",
          },
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
