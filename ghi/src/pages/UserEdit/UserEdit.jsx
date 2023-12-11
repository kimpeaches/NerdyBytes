import useToken from "@galvanize-inc/jwtdown-for-react";
import { useState, useEffect } from "react";
import "../../App.css";
import { useNavigate, Link } from "react-router-dom";

function useFetchUser() {
  const [user, setUser] = useState({
    username: "",
    password: "",
    confirmPassword: "",
    pictureUrl: "",
  });
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch("http://localhost:8000/api/user")
      .then((response) => response.json())
      .then((data) => {
        setUser(data);
      })
      .catch((error) => {
        console.error("Error:", error);
        setError("An error occurred while fetching user data.");
      });
  }, []);

  return { user, error };
}

const EditProfileForm = () => {
  const { user, setUser, error } = useFetchUser();
  const { updateProfile } = useToken();
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (user.password !== user.confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    const userData = {
      username: user.username,
      password: user.password,
      picture_url: user.pictureUrl,
    };

    const updateUrl = "http://localhost:8000/api/user";

    try {
      await updateProfile(userData, updateUrl);

      setTimeout(() => {
        navigate("/dashboard");
      }, 250);
    } catch (error) {
      alert("Error during profile update");
      console.error(error);
    }
  };

  return (
    <>
      {error && <p>{error}</p>}
      <div>
        <h1 className="title">Edit Profile</h1>
        <h4 className="motto">Update your details here.</h4>
      </div>
      <div className="signup">
        <div>
          <form onSubmit={handleSubmit} className="form">
            <div className="control">
              <label htmlFor="username"></label>
              <input
                name="username"
                value={user.username}
                id="username"
                placeholder="Username"
                type="text"
                onChange={handleInputChange}
              ></input>
            </div>
            <div className="control">
              <label htmlFor="password"></label>
              <input
                name="password"
                value={user.password}
                id="password"
                placeholder="Password"
                type="password"
                onChange={handleInputChange}
              ></input>
            </div>
            <div className="control">
              <label htmlFor="confirmPassword"></label>
              <input
                name="confirmPassword"
                value={user.confirmPassword}
                id="confirmPassword"
                placeholder="Confirm Password"
                type="password"
                onChange={handleInputChange}
              ></input>
            </div>
            <div className="control">
              <label htmlFor="pictureUrl"></label>
              <input
                name="pictureUrl"
                value={user.pictureUrl}
                id="pictureURL"
                placeholder="PictureUrl"
                type="text"
                onChange={handleInputChange}
              ></input>
            </div>
            <div className="signup-btn wrapper">
              <button type="submit">Update Profile</button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default EditProfileForm;
