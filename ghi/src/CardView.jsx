import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const CardView = () => {
    const { cardId } = useParams();
    const [card, setCard] = useState(null);

    useEffect(() => {
        fetch(`http://localhost:8000/api/card/${cardId}`)
            .then(response => response.json())
            .then(data => setCard(data))
            .catch(error => console.error(error));
    }, [cardId]);

    if (!card) {
        return <div>Loading...</div>;
    }

    return (
        <div className="card">
            <div className="question">
                <h2>{card.question}</h2>
            </div>
            <div className="answer">
                <p>{card.answer}</p>
            </div>
        </div>
    );
};

export default CardView;
