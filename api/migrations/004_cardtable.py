steps = [
    [
        # "Up" SQL statement
        """
        CREATE TABLE card (
            id SERIAL PRIMARY KEY NOT NULL,
            deck_id INT,
            question VARCHAR(255) NOT NULL,
            wrong_count INT DEFAULT 0,
            right_count INT DEFAULT 0,
            flag BOOLEAN DEFAULT false,
            FOREIGN KEY (deck_id) REFERENCES deck(id)
);
        """,
        # "Down" SQL statement
        """
        DROP TABLE card;
        """,
    ],
]
