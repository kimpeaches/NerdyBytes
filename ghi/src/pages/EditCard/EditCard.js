import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../Login/Login.css";
import { useParams } from "react-router";

const EditCard = ({ currentUser }) => {
  const { cardId, deckId } = useParams();
  const [cardCreated, setCardUpdated] = useState(false);
  const [question, setQuestion] = useState("");

  const handleQuestionChange = (event) => {
    const value = event.target.value;
    setQuestion(value);
    setCardUpdated(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = {
      deck_id: deckId,
      user_id: currentUser.id,
      question: question,
      wrong_count: 0,
      right_count: 0,
      flag: false,
    };

    const url = `${process.env.REACT_APP_API_HOST}/api/deck/${deckId}/card/${cardId}`;
    const fetchOptions = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
      credentials: "include",
    };

    try {
      const response = await fetch(url, fetchOptions);
      if (response.ok) {
        setQuestion("");
        setCardUpdated(true);
      } else {
        console.log("An error occurred while updating the card");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className="card shadow m-5 p-3 col-6 mx-auto">
        <div className="card-body">
          <form onSubmit={handleSubmit} id="update-deck-form">
            <h1 className="card-title">Update a Card</h1>
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
            <button type="submit" className="wrapper">
              Update Card
            </button>
          </form>
        </div>
      </div>
      <div
        className={
          cardCreated ? "alert alert-success p-2 col-6 mx-auto" : "d-none"
        }
      >
        <p className="h3 text-center">Deck Successfully Updated!</p>
        <Link to={`/${deckId}/cardlist`} className="m-3 larger-text">
          {"<< Go back to Deck"}
        </Link>
      </div>
    </>
  );
};

export default EditCard;
