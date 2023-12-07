import React, { useState, useEffect } from "react";
import "../Login/Login.css";

const CardForm = ({ currentUser }) => {
  const [cardCreated, setCardCreated] = useState(false);
  const [deckList, setDeckList] = useState([]);
  const [deckId, setDeckId] = useState(0);
  const [question, setQuestion] = useState("");

  useEffect(() => {
    async function getDecks() {
      const url = `http://localhost:8000/api/deck`;
      const fetchOptions = {
        credentials: "include",
        method: "GET",
      };
      const response = await fetch(url, fetchOptions);
      if (response.ok) {
        const data = await response.json();
        setDeckList(data);
      } else {
        console.log("Error fetching decks");
      }
    }

    getDecks();
  }, []);

  const userDecks = deckList.filter((deck) => deck.user_id === currentUser.id);

  const handleDeckChange = (event) => {
    const value = event.target.value;
    setDeckId(value);
  };

  const handleQuestionChange = (event) => {
    const value = event.target.value;
    setQuestion(value);
    setCardCreated(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = {
      deck_id: deckId,
      question: question,
      wrong_count: 0,
      right_count: 0,
      flag: false,
    };

    const url = `http://localhost:8000/api/card`;
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
        setCardCreated(true);
        setQuestion("");
        setDeckId(0);
      } else {
        console.log("An error occurred while creating the card");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="card shadow m-5 p-3 col-6 mx-auto">
      <div className="card-body">
        <form onSubmit={handleSubmit} id="create-card-form">
          <h1 className="card-title">Create a Card</h1>
          <div className="form-floating mb-3">
            <input
              onChange={handleQuestionChange}
              value={question}
              placeholder="Question"
              required
              type="text"
              name="question"
              id="question"
              className="form-control"
            />
            <label htmlFor="question">Question</label>
          </div>
          <div className="mb-3">
            <label htmlFor="selectedDeck" className="form-label"></label>
            <select
              onChange={handleDeckChange}
              value={deckId}
              required
              id="selectedDeck"
              name="selectedDeck"
              className="form-select"
            >
              <option value="">Choose a Deck</option>
              {userDecks.map((deck) => (
                <option key={deck.id} value={deck.id}>
                  {deck.name}
                </option>
              ))}
            </select>
          </div>
          <button type="submit" className="wrapper">
            Create Card
          </button>
        </form>
      </div>
      {cardCreated && (
        <div className="alert alert-success p-2 col-6 mx-auto">
          <p className="h3 text-center">Card Successfully Created!</p>
        </div>
      )}
    </div>
  );
};

export default CardForm;
