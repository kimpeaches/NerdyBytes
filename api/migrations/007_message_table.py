steps = [
    [
        # "Up" SQL statement
        """
        CREATE TABLE message (
            id SERIAL PRIMARY KEY NOT NULL,
            text VARCHAR(8000),
            created TIMESTAMP,
            username VARCHAR(20),
            chat_room_id INT,
            FOREIGN KEY (username) REFERENCES users(username),
            FOREIGN KEY (chat_room_id) REFERENCES chat_room(id)
);
        """,
        # "Down" SQL statement
        """
        DROP TABLE message;
        """,
    ],
]
