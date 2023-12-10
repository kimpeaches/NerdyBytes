import React, { useState } from "react";
import "./CreateDeck.css";
import { Link } from "react-router-dom";

const DeckForm = ({ currentUser }) => {
  const [deckName, setDeckName] = useState("");
  const [deckCreated, setDeckCreated] = useState(false);

  const handleDeckNameChange = (e) => {
    const value = e.target.value;
    setDeckName(value);
    setDeckCreated(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = {
      name: deckName,
      user_id: currentUser.id,
    };
    const url = "http://localhost:8000/api/deck";
    const fetchOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
      credentials: "include",
    };

    try {
      const response = await fetch(url, fetchOptions);
      if (response.ok) {
        setDeckName("");
        setDeckCreated(true);
      } else {
        console.log("An error occurred while creating the deck");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className="card shadow m-5 p-3 col-6 mx-auto">
        <div className="card-body">
          <form onSubmit={handleSubmit} id="create-appointment-form">
            <h1 className="card-title">Create a Deck</h1>
            <div className="form-floating mb-3">
              <input
                onChange={handleDeckNameChange}
                value={deckName}
                placeholder="Deck Name"
                required
                type="text"
                name="deckName"
                id="deckName"
                className="form-control"
              />
              <label htmlFor="deckName">Deck Name</label>
            </div>
            <button type="submit" className="btn btn-primary">
              Create Deck
            </button>
          </form>
        </div>
      </div>
      <div
        className={
          deckCreated ? "alert alert-success p-2 col-6 mx-auto" : "d-none"
        }
      >
        <p className="h3 text-center">Deck Successfully Created!</p>
        <Link to="/dashboard" className="m-3 larger-text">
          {"<< Go to Dashboard"}
        </Link>
      </div>
    </>
  );
};

export default DeckForm;
