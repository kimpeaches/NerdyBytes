import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import CardForm from "../../components/cardlist/Card/CreateCard";
import "./CardList.css";
import "../Login/Login.css";

function CardList() {
    const { deckId } = useParams();
    const [cards, setCards] = useState([]);
    const [reload, setReload] = useState(false);
    const [deck, setDeck] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        async function getDeck() {
            const url = `${process.env.REACT_APP_API_HOST}/api/deck/${deckId}`;
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
        }

        async function getCards() {
            const url = `${process.env.REACT_APP_API_HOST}/api/${deckId}/card`;
            const fetchOptions = {
                credentials: "include",
                method: "GET",
            };
            const response = await fetch(url, fetchOptions);
            if (response.ok) {
                try {
                    if (
                        response.headers.get("content-length") === "0" ||
                        !response.headers
                            .get("content-type")
                            .includes("application/json")
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

        getDeck();
        getCards();
    }, [reload, deckId]);

    const triggerReload = () => {
        setReload(!reload);
    };

    const deleteCard = async (e, cardId) => {
        e.preventDefault();
        const url = `${process.env.REACT_APP_API_HOST}/api/card/${cardId}`;
        const fetchOptions = {
            credentials: "include",
            method: "DELETE",
        };

        const response = await fetch(url, fetchOptions);
        if (response.ok) {
            triggerReload();
        } else {
            console.log("failed to delete card");
        }
    };

    return (
        <>
            <div className="card-list">
                <h1 className="mb-3 text-center">Deck: {deck.name}</h1>
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
                                    <p>
                                        You Don't Have Any Decks. Please create
                                        one.
                                    </p>
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
                                            <button
                                                id="buttons"
                                                onClick={() =>
                                                    navigate(
                                                        `/card/${card.id}/option`
                                                    )
                                                }
                                            >
                                                View
                                            </button>
                                        </td>
                                        <td>
                                            <button
                                                id="buttons"
                                                onClick={() =>
                                                    navigate(
                                                        `/decks/${deck.id}/cards/${card.id}/edit`
                                                    )
                                                }
                                            >
                                                Edit
                                            </button>
                                        </td>

                                        <td>
                                            <button
                                                id="buttons"
                                                onClick={(e) =>
                                                    deleteCard(e, card.id)
                                                }
                                            >
                                                Delete
                                            </button>
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
