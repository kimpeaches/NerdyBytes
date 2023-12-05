import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@galvanize-inc/jwtdown-for-react";
import Nav from "./components/shared/Nav/Nav";
import Dashboard from "./pages/Dashboard/Dashboard";
import LoginForm from "./LoginForm";
import "./App.css";
import UserContext from "./contexts/UserContext";

function App() {
  const domain = /https:\/\/[^/]+/;
  const basename = process.env.PUBLIC_URL.replace(domain, "");
  const [user, setUser] = useState(null);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      <div className="container">
        <BrowserRouter basename={basename}>
          <Nav />
          <AuthProvider baseUrl="http://localhost:8000">
            <Routes>
              <Route exact path="/login" element={<LoginForm />}></Route>
              <Route exact path="/dashboard" element={<Dashboard />}></Route>
            </Routes>
          </AuthProvider>
        </BrowserRouter>
      </div>
    </UserContext.Provider>
  );
}

export default App;
