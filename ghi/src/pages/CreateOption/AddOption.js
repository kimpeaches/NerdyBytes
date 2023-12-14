import React, { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";

function AddOption() {
  const { cardId } = useParams();
  const [card, setCard] = useState({});
  const [option, setOption] = useState("");
  const [options, setOptions] = useState([]);
  const [reload, setReload] = useState(false);
  const [optionCreated, setOptionCreated] = useState(false);
  const [isChecked, setIsChecked] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    setIsChecked(e.target.checked);
  };

  const handleDelete = async (id) => {
    const url = `${process.env.REACT_APP_API_HOST}/api/option/${id}`;
    const fetchOptions = {
      method: "DELETE",
      credentials: "include",
    };

    try {
      const response = await fetch(url, fetchOptions);
      if (response.ok) {
        setOptions((prevOptions) =>
          prevOptions.filter((option) => option.id !== id)
        );
      } else {
        console.log("Error deleting option");
      }
    } catch (error) {
      console.log("Error: " + error);
    }
  };

  const handleOptionChange = (e) => {
    setOption(e.target.value);
    setOptionCreated(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const data = {
      card_id: parseInt(cardId, 10),
      possible_answer: option,
      is_correct: isChecked,
    };

    const url = `${process.env.REACT_APP_API_HOST}/api/option`;
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
        const locationHeader = response.headers.get("location");
        const newOption = {
          id: locationHeader ? locationHeader.split("/").pop() : null,
          possible_answer: option,
          is_correct: isChecked,
        };
        setOptions((prevOptions) => [...prevOptions, newOption]);
        setOption("");
        setIsChecked(false);
        setOptionCreated(true);
        setReload(!reload);

        fetchOptionsList();
      } else {
        setError("An error occurred while creating the option");
      }
    } catch (error) {
      setError("Error: " + error);
    } finally {
      setLoading(false);
    }
  };

  const fetchOptionsList = async () => {
    const url = `${process.env.REACT_APP_API_HOST}/api/${cardId}/option`;
    try {
      const response = await fetch(url, {
        credentials: "include",
        method: "GET",
      });

      if (response.ok) {
        const data = await response.json();
        setOptions(data);
      } else {
        console.log("No options found for this card");
      }
    } catch (error) {
      console.log("Error fetching options:", error);
    }
  };

  useEffect(() => {
    async function getCard() {
      const url = `${process.env.REACT_APP_API_HOST}/api/card/${cardId}`;
      try {
        const response = await fetch(url, {
          credentials: "include",
          method: "GET",
        });

        if (response.ok) {
          const data = await response.json();
          setCard(data);
        } else {
          console.log("No card found with provided ID");
        }
      } catch (error) {
        console.log("Error fetching card:", error);
      } finally {
        setLoading(false);
      }
    }

    getCard();
    fetchOptionsList();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cardId]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <div className="card-list">
        <h1 className="mb-3 text-center">Question: {card.question}</h1>
        <table className="table table-hover table-striped">
          <thead>
            <tr>
              <th scope="col">ID #</th>
              <th scope="col">Possible Answer</th>
              <th scope="col">Correct</th>
              <th scope="col">Edit</th>
              <th scope="col">Delete</th>
            </tr>
          </thead>
          <tbody>
            {options.map((option) => (
              <tr key={option.id}>
                <td>{option.id}</td>
                <td>{option.possible_answer}</td>
                <td>{option.is_correct ? "Yes" : "No"}</td>
                <td>
                  <button
                    onClick={() =>
                      navigate(
                        `/decks/${cardId}/cards/${option.id}/options/${option.id}/edit`
                      )
                    }
                  >
                    Edit
                  </button>
                </td>
                <td>
                  <button onClick={() => handleDelete(option.id)}>
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="card shadow m-5 p-3 col-6 mx-auto">
        <div className="card-body">
          <form onSubmit={handleSubmit} id="create-option-form">
            <h1 className="card-title">Add Possible Answer</h1>
            <div className="form-group">
              <input
                type="text"
                className="form-control"
                id="option"
                value={option}
                onChange={handleOptionChange}
                required
              />
              {!option && <p>Please enter a Possible Answer.</p>}
            </div>
            <div className="mt-2 d-flex">
              <span className="mr-4">Correct?</span>
              <input
                className="ms-2"
                type="checkbox"
                id="isCorrect"
                checked={isChecked}
                onChange={handleInputChange}
              />
            </div>
            {loading && <p>Loading...</p>}
            {error && <p>Error: {error}</p>}
            <button type="submit" className="btn btn-primary mt-3">
              Add Possible Answer
            </button>
          </form>
        </div>
      </div>

      {optionCreated && (
        <div className="alert alert-success p-2 col-6 mx-auto">
          <p className="h3 text-center">Answer Successfully Created!</p>
          <Link to="/dashboard" className="m-3 larger-text">
            {"<< Go to Dashboard"}
          </Link>
        </div>
      )}
    </>
  );
}

export default AddOption;
