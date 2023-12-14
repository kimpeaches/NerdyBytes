import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../Login/Login.css";
import { useParams } from "react-router";

const EditOption = ({ currentUser }) => {
    const navigate = useNavigate();
    const { optionId } = useParams();
    const [optionCreated, setOptionUpdated] = useState(false);
    const [possibleAnswer, setPossibleAnswer] = useState("");
    const [isCorrect, setIsCorrect] = useState(false);
    const [singleOptionId, setSingleOptionId] = useState(0);
    const [cardId, setCardId] = useState(0);

    const handlePossibleAnswerChange = (event) => {
        const value = event.target.value;
        setPossibleAnswer(value);
        setOptionUpdated(false);
    };

    const handleCheckboxChange = (e) => {
        setIsCorrect(e.target.checked);
    };

    const fetchOption = async () => {
        const url = `${process.env.REACT_APP_API_HOST}/api/option/${optionId}`;
        try {
            const response = await fetch(url, {
                credentials: "include",
                method: "GET",
            });

            if (response.ok) {
                const data = await response.json();
                setPossibleAnswer(data.possible_answer);
                setIsCorrect(data.is_correct);
                setSingleOptionId(data.id);
                setCardId(data.card_id);
                console.log(data);
            } else {
                console.log("No option found with provided ID");
            }
        } catch (error) {
            console.log("Error fetching option:", error);
        }
    };

    useEffect(() => {
        fetchOption();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const data = {
            id: singleOptionId,
            card_id: cardId,
            possible_answer: possibleAnswer,
            is_correct: isCorrect,
        };

        const url = `${process.env.REACT_APP_API_HOST}/api/option/${optionId}`;
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
                setPossibleAnswer("");
                setOptionUpdated(true);
            } else {
                console.log("An error occurred while updating the option");
            }
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <>
            <div className="card shadow m-5 p-3 col-6 mx-auto">
                <div className="card-body">
                    <form onSubmit={handleSubmit} id="update-option-form">
                        <h1 className="card-title">
                            Update a Possible Answer:
                        </h1>
                        <div className="form-floating mb-3">
                            <input
                                onChange={handlePossibleAnswerChange}
                                value={possibleAnswer}
                                placeholder="Possible Answer"
                                required
                                type="text"
                                name="possibleAnswer"
                                id="possibleAnswer"
                                className="form-control"
                            />
                            <label htmlFor="possibleAnswer">
                                Possible Answer
                            </label>
                        </div>
                        <div className="mt-2 d-flex">
                            <span className="mr-4">Correct?</span>
                            <input
                                className="ms-2"
                                type="checkbox"
                                id="isCorrect"
                                checked={isCorrect}
                                onChange={handleCheckboxChange}
                            />
                        </div>
                        <button id="buttons" type="submit" className="wrapper">
                            Update Possible Answer
                        </button>
                    </form>
                </div>
            </div>
            <div
                className={
                    optionCreated
                        ? "alert alert-success p-2 col-6 mx-auto"
                        : "d-none"
                }
            >
                <p className="h3 text-center">Answer Successfully Updated!</p>
                <button
                    onClick={() => navigate(-1)}
                    className="m-3 larger-text"
                    id="buttons"
                >
                    {"<< Go back to Possible Answers"}
                </button>
            </div>
        </>
    );
};

export default EditOption;
