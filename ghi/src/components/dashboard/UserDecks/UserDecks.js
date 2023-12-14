import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import TrashIcon from "../../shared/TrashSvg/TrashSvg";

import "./UserDecks.css";

function UserDecks({ user }) {
    const [decks, setDecks] = useState([]);
    const navigate = useNavigate();

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
            <div className="d-flex flex-wrap justify-content-around overflow-x-auto">
                {userDecks.length === 0 ? (
                    <p>You Don't Have Any Decks. Please create one.</p>
                ) : (
                    userDecks.map((deck) => {
                        return (
                            <div
                                key={deck.id}
                                className="study-deck card rounded-3 m-2 shadow p-0"
                                style={{ width: "20rem" }}
                            >
                                <div className="card-body">
                                    <h5 className="card-title">{deck.name}</h5>
                                    <div className="d-flex justify-content-between">
                                        <button
                                            id="btn-study"
                                            onClick={() =>
                                                navigate(`/${deck.id}/study`)
                                            }
                                            className="card-link"
                                        >
                                            Study
                                        </button>
                                        <button
                                            id="btn-study"
                                            onClick={() =>
                                                navigate(`/${deck.id}/cardlist`)
                                            }
                                            className="card-link"
                                        >
                                            Browse
                                        </button>
                                        <button
                                            id="btn-study"
                                            onClick={() =>
                                                navigate(`/${deck.id}/editdeck`)
                                            }
                                            className="card-link"
                                        >
                                            Edit
                                        </button>
                                        <TrashIcon
                                            className="card-link"
                                            onClick={() => deleteDeck(deck.id)}
                                            style={{
                                                cursor: "pointer",
                                                width: "50%",
                                            }}
                                        />
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
