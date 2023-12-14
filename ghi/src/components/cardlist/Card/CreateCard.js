import React, { useState } from "react";
import { useParams } from "react-router-dom";
import "../../../pages/Login/Login.css";

const CardForm = ({ triggerReload }) => {
    const { deckId } = useParams();
    const [cardCreated, setCardCreated] = useState(false);
    const [question, setQuestion] = useState("");

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

        const url = `${process.env.REACT_APP_API_HOST}/api/card`;
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
                triggerReload();
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
                    <h1 className="card-title">Add a Card</h1>
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
                    <button type="submit" id="buttons" className="wrapper">
                        Create Card
                    </button>
                </form>
            </div>
            {cardCreated && (
                <div className="alert alert-success p-2 col-6 mx-auto">
                    <p className="h3 text-center">Card Successfully Added!</p>
                </div>
            )}
        </div>
    );
};

export default CardForm;
