import useToken from "@galvanize-inc/jwtdown-for-react";
import { useState, useEffect } from "react";
import "../../App.css";
import { useNavigate, Link } from "react-router-dom";

const EditProfileForm = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [pictureUrl, setPictureUrl] = useState("");
  const { updateProfile } = useToken();
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch current user data and populate form fields
    // This is just a placeholder. Replace it with your actual logic.
    const currentUser = {
      username: "currentUsername",
      password: "currentPassword",
      picture_url: "currentPictureUrl",
    };
    setUsername(currentUser.username);
    setPassword(currentUser.password);
    setPictureUrl(currentUser.picture_url);
  }, []);

  const handleUsernameChange = (e) => {
    const value = e.target.value;
    setUsername(value);
  };
  const handlePasswordChange = (e) => {
    const value = e.target.value;
    setPassword(value);
  };
  const handleConfirmPasswordChange = (e) => {
    const value = e.target.value;
    setConfirmPassword(value);
  };
  const handlePictureUrlChange = (e) => {
    const value = e.target.value;
    setPictureUrl(value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    const userData = {
      username: username,
      password: password,
      picture_url: pictureUrl,
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
                value={username}
                id="username"
                placeholder="Username"
                type="text"
                onChange={handleUsernameChange}
              ></input>
            </div>
            <div className="control">
              <label htmlFor="password"></label>
              <input
                value={password}
                id="password"
                placeholder="Password"
                type="password"
                onChange={handlePasswordChange}
              ></input>
            </div>
            <div className="control">
              <label htmlFor="confirmPassword"></label>
              <input
                value={confirmPassword}
                id="confirmPassword"
                placeholder="Confirm Password"
                type="password"
                onChange={handleConfirmPasswordChange}
              ></input>
            </div>
            <div className="control">
              <label htmlFor="pictureUrl"></label>
              <input
                value={pictureUrl}
                id="pictureURL"
                placeholder="PictureUrl"
                type="text"
                onChange={handlePictureUrlChange}
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
