steps = [
    [
        # "Up" SQL statement
        """
        CREATE TABLE message (
            text VARCHAR(8000),
            created DATE NOT NULL,
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
