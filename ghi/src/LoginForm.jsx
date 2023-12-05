import { useState } from "react";
import { useNavigate } from "react-router-dom";
import useToken from "@galvanize-inc/jwtdown-for-react";
import "./Login.css";

const LoginForm = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const { login } = useToken();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await login(username, password);
            navigate("/dashboard");
        } catch (error) {
            console.error("Login failed: ", error);
        }
    };

    return (
        <>
            <div>
                <h1 className="title">NerdyBytes</h1>
                <h4 className="motto">
                    Unleash your potential, one card at a time.
                </h4>
            </div>
            <div className="login">
                <div>
                    <div className="owl">
                        <div className="hand"></div>
                        <div className="hand hand-r"></div>
                        <div className="arms">
                            <div className="arm"></div>
                            <div className="arm arm-r"></div>
                        </div>
                    </div>
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
                                onChange={(e) => setPassword(e.target.value)}
                            ></input>
                        </div>
                        <div className="login-btn wrapper">
                            <button>Login</button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
};
export default LoginForm;
