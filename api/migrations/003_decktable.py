steps = [
    [
        # "Up" SQL statement
        """
        CREATE TABLE deck (
            id SERIAL PRIMARY KEY NOT NULL,
            user_id INT,
            public_status BOOLEAN DEFAULT false,
            study_count INT DEFAULT 0,
            total_cards INT DEFAULT 0,
            name VARCHAR(75) NOT NULL,
            FOREIGN KEY (user_id) REFERENCES users(id)
        );
        """,
        # "Down" SQL statement
        """
        DROP TABLE deck;
        """,
    ],
]
