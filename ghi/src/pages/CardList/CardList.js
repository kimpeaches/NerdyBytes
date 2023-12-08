import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import CardForm from "../../components/cardlist/Card/CreateCard";
import "./CardList.css";

function CardList() {
  const { deckId } = useParams();
  const [cards, setCards] = useState([]);
  const [reload, setReload] = useState(false);

  useEffect(() => {
    async function getCards() {
      const url = `http://localhost:8000/api/${deckId}/card`;
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
            console.log("No cards found");
            setCards([]);
          } else {
            const data = await response.json();
            setCards(data);
          }
        } catch (error) {
          console.log("No cards found");
          setCards([]);
        }
      } else {
        console.log("No cards found");
      }
    }

    getCards();
  }, [reload, deckId]);

  const triggerReload = () => {
    setReload(!reload);
  };

  return (
    <>
      <div className="card-list">
        <h1 className="mb-3 text-center">Cards</h1>
        <table className="table table-hover table-striped">
          <thead>
            <tr>
              <th scope="col">ID #</th>
              <th scope="col">Question</th>
              <th scope="col">Right Count</th>
              <th scope="col">Wrong Count</th>
              <th scope="col">Options</th>
              <th scope="col">Edit</th>
              <th scope="col">Delete</th>
            </tr>
          </thead>
          <tbody>
            {cards && cards.length === 0 ? (
              <tr>
                <td colSpan="4">
                  <p>You Don't Have Any Decks. Please create one.</p>
                </td>
              </tr>
            ) : (
              cards &&
              cards.map((card) => {
                return (
                  <tr key={card.id}>
                    <td>{card.id}</td>
                    <td>{card.question}</td>
                    <td>{card.right_count}</td>
                    <td>{card.wrong_count}</td>
                    <td>
                      <Link to={`/card/${card.id}/option`}>View</Link>
                    </td>
                    <td>
                      <Link to={`/`}>Edit</Link>
                    </td>
                    <td>
                      <Link to={`/`}>Delete</Link>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>
      <CardForm triggerReload={triggerReload} />
    </>
  );
}

export default CardList;
