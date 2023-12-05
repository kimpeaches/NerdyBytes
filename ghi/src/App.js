import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@galvanize-inc/jwtdown-for-react";
import Nav from "./components/shared/Nav/Nav";
import Dashboard from "./pages/Dashboard/Dashboard";
import LoginForm from "./LoginForm";
import "./App.css";
import Chat from "./ChatPage";

function App() {
    const domain = /https:\/\/[^/]+/;
    const basename = process.env.PUBLIC_URL.replace(domain, "");

    return (
        <div className="container">
            <BrowserRouter basename={basename}>
                <Nav />
                <AuthProvider baseUrl="http://localhost:8000">
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
                        <Route exact path="/chat" element={<Chat />}></Route>
                    </Routes>
                </AuthProvider>
            </BrowserRouter>
        </div>
    );
}

export default App;
