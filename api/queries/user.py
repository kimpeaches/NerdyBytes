from pydantic import BaseModel
from queries.accounts import pool
from typing import Union

class DuplicateAccountError(ValueError):
    pass

class Error(BaseModel):
    message: str


class UserIn(BaseModel):
    username: str
    password: str
    picture_url: str


class UserOut(BaseModel):
    id: int
    username: str
    picture_url: str


class UserOutWithPassword(UserOut):
    hashed_password: str
    picture_url: str


class UserRepository:
    def get(self, username: str) -> UserOutWithPassword:
        # with pool.connection() as conn:
        with pool.connection() as conn:
            with conn.cursor() as db:
                result = db.execute(
                    """
                    SELECT *
                    FROM users
                    WHERE username = %s
                    """,
                    [username],
                )
                user = result.fetchone()
                return UserOutWithPassword(
                    id=user[0],
                    picture_url=user[1],
                    username=user[2],
                    hashed_password=user[3],
                )

    def create(self, info: UserIn, hashed_password: str) -> Union[UserOut, Error]:
        with pool.connection() as conn:
            # get a cursor (something to run SQL with)
            with conn.cursor() as db:
                # Run our INSERT statement
                result = db.execute(
                    """
                    INSERT INTO users
                        (username, password, picture_url)
                    VALUES
                        (%s, %s, %s)
                    RETURNING id;
                    """,
                    [
                        info.username,
                        hashed_password,
                        info.picture_url
                    ]
                )
                id = result.fetchone()[0]
                return self.user_in_to_out(id, info)

    def user_in_to_out(self, id: int, user: UserIn):
        old_data = user.dict()
        return UserOut(id=id, **old_data)
