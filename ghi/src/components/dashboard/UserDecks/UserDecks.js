import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./UserDecks.css";

function UserDecks({ user }) {
  const [decks, setDecks] = useState([]);

  useEffect(() => {
    async function getDecks() {
      const url = `${process.env.REACT_APP_API_HOST}/api/deck`;
      const fetchOptions = {
        credentials: "include",
        method: "GET",
      };
      const response = await fetch(url, fetchOptions);
      if (response.ok) {
        const data = await response.json();
        setDecks(data);
      } else {
        console.log("Error fetching decks");
      }
    }

    getDecks();
  }, []);

  const userDecks = decks.filter((deck) => deck.user_id === user.id);

  async function deleteDeck(deck_id) {
    const url = `${process.env.REACT_APP_API_HOST}/api/deck/${deck_id}`;
    const fetchOptions = {
      credentials: "include",
      method: "DELETE",
    };
    const response = await fetch(url, fetchOptions);
    if (response.ok) {
      console.log("Deck deleted successfully");
      setDecks(decks.filter((d) => d.id !== deck_id));
    } else {
      console.log("Error deleting deck");
    }
  }

  return (
    <div className="user-deck-list">
      <h1>Your Decks</h1>
      {/* TODO: Add search bar */}
      <div className="d-flex flex-wrap justify-content-around overflow-x-auto">
        {userDecks.length === 0 ? (
          <p>You Don't Have Any Decks. Please create one.</p>
        ) : (
          userDecks.map((deck) => {
            return (
              <div
                key={deck.id}
                className="study-deck card rounded-3 m-2 shadow"
                style={{ width: "18rem" }}
              >
                <div className="card-body">
                  <h5 className="card-title">{deck.name}</h5>
                  {/* TODO: Add deck description */}
                  <div className="d-flex justify-content-between">
                    <Link to={`/${deck.id}/study`} className="card-link">
                      Study
                    </Link>
                    <Link to={`/${deck.id}/cardlist`} className="card-link">
                      Browse
                    </Link>
                    <Link to={`/${deck.id}/editdeck`} className="card-link">
                      Edit
                    </Link>
                    <Link href="#" className="card-link">
                      <img
                        src="/trash.jpg"
                        alt="trash"
                        className="card-link"
                        style={{ width: "30px" }}
                        onClick={() => deleteDeck(deck.id)}
                      />
                    </Link>
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}

export default UserDecks;
