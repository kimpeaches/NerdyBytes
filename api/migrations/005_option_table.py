steps = [
    [
        # "Up" SQL statement
        """
        CREATE TABLE option (
            id SERIAL PRIMARY KEY NOT NULL,
            card_id INT,
            possible_answer VARCHAR(255) NOT NULL,
            is_correct BOOLEAN DEFAULT false,
            FOREIGN KEY (card_id) REFERENCES card(id)
        );
        """,
        # "Down" SQL statement
        """
        DROP TABLE option;
        """,
    ],
]
