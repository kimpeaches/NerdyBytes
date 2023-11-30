steps = [
    [
        # "Up" SQL statement
        """
        CREATE TABLE date (
            id SERIAL PRIMARY KEY NOT NULL,
            user_id INT,
            date DATE,
            studied_today BOOLEAN DEFAULT false,
            FOREIGN KEY (user_id) REFERENCES users(id)
);
        """,
        # "Down" SQL statement
        """
        DROP TABLE message;
        """,
    ],
]
