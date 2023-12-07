import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@galvanize-inc/jwtdown-for-react";
import Nav from "./components/shared/Nav/Nav";
import Dashboard from "./pages/Dashboard/Dashboard";
import LoginForm from "./pages/Login/LoginForm";
import SignupForm from "./pages/Signup/SignupForm";
import CardForm from "./pages/Card/CreateCard";
import "./App.css";
import Chat from "./pages/Chat/ChatPage";
import { UserProvider } from "./useContext/UserContext";
import { useState, useEffect } from "react";
import CreateDeck from "./pages/CreateDeck/CreateDeck";

function App() {
  const domain = /https:\/\/[^/]+/;
  const basename = process.env.PUBLIC_URL.replace(domain, "");
  const [currentUser, setCurrentUser] = useState(undefined);

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch(`http://localhost:8000/token`, {
        credentials: "include",
      });
      const response = await res.json();
      if (response.account) {
        setCurrentUser(response.account);
      }
    };

    fetchData();
  }, []);
  return (
    <div className="container">
      <BrowserRouter basename={basename}>
        <Nav />
        <AuthProvider baseUrl="http://localhost:8000">
          <UserProvider currentUser={currentUser}>
            <Routes>
              <Route exact path="/" element={<LoginForm />}></Route>
              <Route exact path="/dashboard" element={<Dashboard />}></Route>
              <Route exact path="/chat/:chatRoomId" element={<Chat />}></Route>
              <Route exact path="/signup" element={<SignupForm />}></Route>
              <Route
                exact
                path="/create-card"
                element={<CardForm currentUser={currentUser} />}
              ></Route>
              <Route
                path="/create-deck"
                element={<CreateDeck currentUser={currentUser} />}
              />
            </Routes>
          </UserProvider>
        </AuthProvider>
      </BrowserRouter>
    </div>
  );
}
export default App;
