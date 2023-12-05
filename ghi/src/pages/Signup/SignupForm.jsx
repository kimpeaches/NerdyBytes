import useToken from "@galvanize-inc/jwtdown-for-react";
import { useState } from "react";
import "../../App.css";
import { useNavigate } from "react-router-dom";

const SignupForm = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [error, setError] = useState("");
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
            await register(username, password);
            navigate("/dashboard");
        } catch (error) {
            console.error("Signup failed: ", error);
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
                        {error && <p>{error}</p>}
                        <div className="signup-btn wrapper">
                            <button>SignUp</button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
};
export default SignupForm;
