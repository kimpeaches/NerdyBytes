import { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@galvanize-inc/jwtdown-for-react";
import { UserProvider } from "./useContext/UserContext";
import Nav from "./components/shared/Nav/Nav";
import Dashboard from "./pages/Dashboard/Dashboard";
import LoginForm from "./pages/Login/LoginForm";
import SignupForm from "./pages/Signup/SignupForm";
import PublicDeck from "./pages/Deck/PublicDeck";
import "./App.css";
import CardList from "./pages/CardList/CardList";
import CreateDeck from "./pages/CreateDeck/CreateDeck";
import Study from "./pages/Study/Study";
import EditDeck from "./pages/EditDeck/EditDeck";
import EditCard from "./pages/EditCard/EditCard";
import Calendar from "./components/dashboard/Calendar/Calendar";
import AddOption from "./pages/CreateOption/AddOption";
import EditOption from "./pages/EditOption/EditOption";
import ChatFlyover from "./components/shared/ChatFlyover/ChatFlyover";

function App() {
  const domain = /https:\/\/[^/]+/;
  const basename = process.env.PUBLIC_URL.replace(domain, "");
  const [currentUser, setCurrentUser] = useState(undefined);

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch(`${process.env.REACT_APP_API_HOST}/token`, {
        credentials: "include",
      });
      const response = await res.json();
      if (response.account) {
        setCurrentUser(response.account);
      }
    };

    fetchData();
  }, []);

  console.log(currentUser);
  return (
    <div className="container">
      <BrowserRouter basename={basename}>
        <Nav />
        <AuthProvider baseUrl={`${process.env.REACT_APP_API_HOST}`}>
          <UserProvider currentUser={currentUser}>
            {currentUser && <ChatFlyover className="Chatflyover"></ChatFlyover>}
            <Routes>
              <Route exact path="/" element={<LoginForm />}></Route>
              <Route exact path="/calendar" element={<Calendar />}></Route>
              <Route exact path="/dashboard" element={<Dashboard />}></Route>
              <Route exact path="/signup" element={<SignupForm />}></Route>
              <Route
                exact
                path="/:deckId/cardlist"
                element={<CardList />}
              ></Route>
              <Route exact path="/create-deck" element={<CreateDeck />}></Route>
              <Route exact path="/publicdeck" element={<PublicDeck />}></Route>
              <Route
                exact
                path="/:deckId/editdeck"
                element={<EditDeck />}
              ></Route>
              <Route
                exact
                path="/decks/:deckId/cards/:cardId/edit"
                element={<EditCard currentUser={currentUser} />}
              ></Route>
              <Route exact path="/:deckId/study" element={<Study />}></Route>
              <Route
                exact
                path="/card/:cardId/option"
                element={<AddOption />}
              ></Route>
              <Route
                exact
                path="/decks/:deckId/cards/:cardId/options/:optionId/edit"
                element={<EditOption currentUser={currentUser} />}
              ></Route>
            </Routes>
          </UserProvider>
        </AuthProvider>
      </BrowserRouter>
    </div>
  );
}
export default App;
