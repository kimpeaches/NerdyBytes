steps = [
    [
        # "Up" SQL statement
        """
        CREATE TABLE deck (
            id SERIAL PRIMARY KEY NOT NULL,
            user_id INT,
            public_status BOOLEAN NOT NULL,
            study_count INT NOT NULL,
            total_cards INT DEFAULT 0 NOT NULL,
            name VARCHAR(75) NOT NULL,
            FOREIGN KEY (user_id) REFERENCES users(id)
);
        """,
        # "Down" SQL statement
        """
        DROP TABLE deck;
        """
    ],
]