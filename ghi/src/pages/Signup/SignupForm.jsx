import useToken from "@galvanize-inc/jwtdown-for-react";
import { useState } from "react";
import "../../App.css";
import { useNavigate } from "react-router-dom";

const SignupForm = () => {
    const { token } = useToken();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [error, setError] = useState("");
    const [pictureUrl, setPictureUrl] = useState("");
    const { register } = useToken();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            console.error("Passwords do not match");
            setError("Passwords do not match");
            return;
        }
        try {
            const formData = new FormData();
            formData.append('username', username);
            formData.append('password', password);
            formData.append('pictureUrl', pictureUrl);

            const headers = {
                'Authorization': `Bearer ${token}`
            };

            const response = await register(formData);
            const data = await response.json();
            if (response.ok) {
                navigate("/dashboard");
            } else {
                setError(response.message);
            }
        } catch (error) {
            if (error.response) {
                console.log("Error response data:", error.response.data);
                console.log("Error response status:", error.response.status);
                console.log("Error response headers:", error.response.headers);
            } else {
                console.log("The error is: ", error);
            }
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
                    <form onSubmit={(e) => handleSubmit(e)} className="form">
                        <div className="control">
                            <label htmlFor="username"></label>
                            <input
                                id="username"
                                placeholder="Username"
                                type="text"
                                onChange={(e) => setUsername(e.target.value)}
                            ></input>
                        </div>
                        <div className="control">
                            <label htmlFor="password"></label>
                            <input
                                id="password"
                                placeholder="Password"
                                type="password"
                                onChange={(e) => {
                                    setPassword(e.target.value);
                                    setError("");
                                }}
                            ></input>
                        </div>
                        <div className="control">
                            <label htmlFor="confirmPassword"></label>
                            <input
                                id="confirmPassword"
                                placeholder="Confirm Password"
                                type="password"
                                onChange={(e) => {
                                    setConfirmPassword(e.target.value);
                                    setError("");
                                }}
                            ></input>
                        </div>
                        <div className="control">
                            <label htmlFor="pictureUrl"></label>
                            <input
                                id="pictureURL"
                                placeholder="PictureUrl"
                                type="text"
                                onChange={(e) => setPictureUrl(e.target.value)}
                            ></input>
                        </div>
                        {error && <p>{error}</p>}
                        <div className="signup-btn wrapper">
                            <button type="submit">SignUp</button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
};
export default SignupForm;
