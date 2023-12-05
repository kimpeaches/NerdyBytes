import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@galvanize-inc/jwtdown-for-react";
import Nav from "./components/shared/Nav/Nav";
import Dashboard from "./pages/Dashboard/Dashboard";
import LoginForm from "./pages/Login/LoginForm";
import "./App.css";
import Chat from "./pages/Chat/ChatPage";
import { UserProvider } from "./UserContext";
import { useState, useEffect } from "react";

function App() {
    const domain = /https:\/\/[^/]+/;
    const basename = process.env.PUBLIC_URL.replace(domain, "");
    const [users, setUsers] = useState([]);
    const [currentUser, setCurrentUser] = useState(null);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await fetch(
                    "http://localhost:8000/api/users/",
                    {
                        credentials: "include",
                    }
                );
                const userData = await response.json();
                setCurrentUser(userData);
            } catch (error) {
                console.error("Error fetching users:", error);
            }
        };

        fetchUsers();
    }, []);
    return (
        <div className="container">
            <BrowserRouter basename={basename}>
                <Nav />
                <AuthProvider baseUrl="http://localhost:8000">
                    <UserProvider currentUser={currentUser}>
                        <Routes>
                            <Route
                                exact
                                path="/login"
                                element={<LoginForm />}
                            ></Route>
                            <Route
                                exact
                                path="/dashboard"
                                element={<Dashboard />}
                            ></Route>
                            <Route
                                exact
                                path="/chat"
                                element={<Chat />}
                            ></Route>
                        </Routes>
                    </UserProvider>
                </AuthProvider>
            </BrowserRouter>
        </div>
    );
}

export default App;
