import React, { useEffect, useState, useCallback } from "react";
import { useParams } from "react-router-dom";
import "./Study.css";

const Study = () => {
  const [card, setCard] = useState({});
  const [deck, setDeck] = useState({});
  const [options, setOptions] = useState([]);
  const { deckId } = useParams();
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [shuffledOptions, setShuffledOptions] = useState([]);
  const [isCorrect, setIsCorrect] = useState(false);
  const [isIncorrect, setIsIncorrect] = useState(false);

  const rerenderSet = () => {
    const checkboxes = document.querySelectorAll("input[type=checkbox]");
    for (let i = 0; i < checkboxes.length; i++) {
      checkboxes[i].checked = false;
    }
    setIsCorrect(false);
    setIsIncorrect(false);
    setSelectedOptions([]);

    let shuffledOptions = [...options];
    shuffleArray(shuffledOptions);
    setOptions(shuffledOptions);
  };

  const renderNewSet = () => {
    const checkboxes = document.querySelectorAll("input[type=checkbox]");

    for (let i = 0; i < checkboxes.length; i++) {
      checkboxes[i].checked = false;
    }

    setIsCorrect(false);
    setIsIncorrect(false);
    setSelectedOptions([]);
    getCard();
  };

  const handleCheckboxChange = (optionId, isCorrect) => {
    setSelectedOptions((prevSelectedOptions) => {
      if (prevSelectedOptions.includes(optionId)) {
        return prevSelectedOptions.filter((id) => id !== optionId);
      } else {
        return [...prevSelectedOptions, optionId];
      }
    });
  };

  const handleCheckAnswer = () => {
    const allCorrect = selectedOptions.every((optionId) => {
      const option = options.find((option) => option.id === optionId);
      return option.is_correct;
    });

    if (allCorrect) {
      setIsCorrect(true);
    } else {
      setIsIncorrect(true);
    }
  };

  // Using useCallback to memoize the function so it doesn't change on every state change render
  const getOptions = useCallback(async (cardId) => {
    const url = `http://localhost:8000/api/${cardId}/option`;
    const fetchOptions = {
      credentials: "include",
      method: "GET",
    };
    const response = await fetch(url, fetchOptions);
    if (response.ok) {
      const data = await response.json();
      setOptions(data);
    } else {
      console.log("Error fetching options");
    }
  }, []);

  const getCard = useCallback(async () => {
    const url = `http://localhost:8000/api/${deckId}/study/card`;
    const fetchOptions = {
      credentials: "include",
      method: "GET",
    };
    const response = await fetch(url, fetchOptions);
    if (response.ok) {
      try {
        if (
          response.headers.get("content-length") === "0" ||
          !response.headers.get("content-type").includes("application/json")
        ) {
          console.log("No card found");
          setCard({});
        } else {
          const data = await response.json();
          setCard(data);
          getOptions(data.id);
        }
      } catch (error) {
        console.log("No card found");
        setCard({});
      }
    } else {
      console.log("No card found");
    }
  }, [deckId, getOptions]);

  const getDeck = useCallback(async () => {
    const url = `http://localhost:8000/api/deck/${deckId}`;
    const fetchOptions = {
      credentials: "include",
      method: "GET",
    };
    const response = await fetch(url, fetchOptions);
    if (response.ok) {
      const data = await response.json();
      setDeck(data);
    } else {
      console.log("Error fetching deck");
    }
  }, [deckId]);

  function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }

  useEffect(() => {
    getDeck();
    getCard();
  }, [getDeck, getCard]);

  useEffect(() => {
    if (options.length > 0) {
      setShuffledOptions(shuffleArray([...options]));
    }
  }, [options]);

  return (
    <>
      <div className="center-card">
        <div className="max-width card card-theme p-3">
          <div className="h1">Question: {card.question}</div>
          <h6 className="card-subtitle mb-2 text-muted">
            From Deck: {deck.name}
          </h6>
          <form>
            {shuffledOptions.map((option) => (
              <div className="form-check" key={option.id}>
                <input
                  className="form-check-input"
                  type="checkbox"
                  value=""
                  id={`defaultCheck${option.id}`}
                  onChange={() =>
                    handleCheckboxChange(option.id, option.is_correct)
                  }
                />
                <label
                  className="form-check-label"
                  htmlFor={`defaultCheck${option.id}`}
                >
                  {option.possible_answer}
                </label>
              </div>
            ))}
            <button
              type="button"
              className="btn btn-primary"
              onClick={handleCheckAnswer}
            >
              Check Answer
            </button>
          </form>
          {isCorrect ? (
            <div className="answer-alert alert alert-success" role="alert">
              Correct!
              <button onClick={renderNewSet}>Next</button>
            </div>
          ) : isIncorrect ? (
            <div className="answer-alert alert alert-danger" role="alert">
              Incorrect!
              <button onClick={rerenderSet}>Try Again</button>
            </div>
          ) : null}
        </div>
      </div>
    </>
  );
};

export default Study;
