steps = [
    [
        # "Up" SQL statement
        """
        CREATE TABLE chat_room (
            user_id INT,
            FOREIGN KEY (user_id) REFERENCES users(id),
            name VARCHAR(100) NOT NULL,
            messages VARCHAR(8000)
);
        """,
        # "Down" SQL statement
        """
        DROP TABLE chat_room;
        """,
    ],
]
