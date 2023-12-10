import useToken from "@galvanize-inc/jwtdown-for-react";
import { useState } from "react";
import "../../App.css";
import { useNavigate, Link } from "react-router-dom";

const SignupForm = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [pictureUrl, setPictureUrl] = useState("");
  const { register } = useToken();
  const navigate = useNavigate();

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

    const registrationUrl = `${process.env.REACT_APP_API_HOST}/api/user`;

    try {
      await register(userData, registrationUrl);

      setTimeout(() => {
        navigate("/dashboard");
      }, 250);
    } catch (error) {
      alert("Error during registration");
      console.error(error);
    }
  };

  return (
    <>
      <div>
        <h1 className="title">NerdyBytes</h1>
        <h4 className="motto">Unleash your potential, one card at a time.</h4>
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
              <button type="submit">SignUp</button>
            </div>
            <div className="login-btn wrapper" style={{ marginTop: "0.5rem" }}>
              <Link to="/" style={{ textDecoration: "none" }}>
                <button>Login</button>
              </Link>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};
export default SignupForm;
