steps = [
    [
        # "Up" SQL statement
        """
        CREATE TABLE users (
            id SERIAL PRIMARY KEY NOT NULL,
            picture_url VARCHAR(255) NOT NULL,
            username VARCHAR(20) NOT NULL,
            password VARCHAR(20) NOT NULL,
            streak_count INT DEFAULT 0 NOT NULL
        );
        """,
        # "Down" SQL statement
        """
        DROP TABLE users;
        """
    ],
]
