import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "../Login/Login.css";
import { useParams } from "react-router";
import { useUserContext } from "../../useContext/UserContext";

const EditDeck = () => {
  const currentUser = useUserContext();
  const { deckId } = useParams();
  const [deckName, setDeckName] = useState("");
  const [publicStatus, setPublicStatus] = useState(false);
  const [deckUpdated, setDeckUpdated] = useState(false);

  const handleDeckNameChange = (e) => {
    const value = e.target.value;
    setDeckName(value);
    setDeckUpdated(false);
  };

  const handlePublicStatusChange = () => {
    setPublicStatus(!publicStatus);
    setDeckUpdated(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = {
      name: deckName,
      user_id: currentUser.id,
      public_status: publicStatus,
    };
    const url = `${process.env.REACT_APP_API_HOST}/api/deck/${deckId}`;
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
        setDeckName("");
        setDeckUpdated(true);
      } else {
        console.log("An error occurred while updating the deck");
      }
    } catch (error) {
      console.log(error);
    }
  };

  async function getDeck() {
    const url = `${process.env.REACT_APP_API_HOST}/api/deck/${deckId}`;
    const fetchOptions = {
      credentials: "include",
      method: "GET",
    };
    const response = await fetch(url, fetchOptions);
    if (response.ok) {
      const data = await response.json();
      setDeckName(data.name);
      setPublicStatus(data.public_status);
    } else {
      console.log("Error fetching deck");
    }
  }

  useEffect(() => {
    getDeck();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <div className="card shadow m-5 p-3 col-6 mx-auto">
        <div className="card-body">
          <form onSubmit={handleSubmit} id="update-deck-form">
            <h1 className="card-title">Update a Deck</h1>
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
            <div>
              <h4 htmlFor="publicStatus">Share this deck to public</h4>
              <input
                className="form-check-input"
                type="checkbox"
                id="publicStatus"
                checked={publicStatus}
                onChange={handlePublicStatusChange}
              />
            </div>
            <button type="submit" className="wrapper">
              Update Deck
            </button>
          </form>
        </div>
      </div>
      <div
        className={
          deckUpdated ? "alert alert-success p-2 col-6 mx-auto" : "d-none"
        }
      >
        <p className="h3 text-center">Deck Successfully Updated!</p>
        <Link to="/dashboard" className="m-3 larger-text">
          {"<< Go to Dashboard"}
        </Link>
      </div>
    </>
  );
};

export default EditDeck;
