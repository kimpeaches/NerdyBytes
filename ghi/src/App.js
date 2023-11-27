import { AuthProvider } from "@galvanize-inc/jwtdown-for-react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
<<<<<<< HEAD
// import "bootstrap/dist/css/bootstrap.min.css";
// import "bootstrap-icons/font/bootstrap-icons.css";
// import "./overrides.css";
import LoginForm from "./LoginForm";

function App() {
    const domain = /https:\/\/[^/]+/;
    const basename = process.env.PUBLIC_URL.replace(domain, "");

    return (
        <div className="container">
            <BrowserRouter basename={basename}>
                <AuthProvider>
                    <Routes>
                        <Route
                            exact
                            path="/login"
                            element={<LoginForm />}
                        ></Route>
                    </Routes>
                </AuthProvider>
            </BrowserRouter>
        </div>
    );
=======
import LoginForm from "./LoginForm";

function App() {
  const domain = /https:\/\/[^/]+/;
  const basename = process.env.PUBLIC_URL.replace(domain, "");

  return (
    <div className="container">
      <BrowserRouter basename={basename}>
        <AuthProvider baseUrl="http://localhost:8000">
          <Routes>
            <Route exact path="/login" element={<LoginForm />}></Route>
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </div>
  );
>>>>>>> main
}

export default App;
