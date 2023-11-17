from pydantic import BaseModel
from queries.accounts import pool
from typing import Union


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


class UserRepository:
    def create(self, user: UserIn) -> Union[UserOut, Error]:
        try:
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
                            user.username,
                            user.password,
                            user.picture_url
                        ]
                    )
                    id = result.fetchone()[0]
                    return self.user_in_to_out(id, user)
        except Exception:
            return {"message": "Create did not work"}

    def user_in_to_out(self, id: int, user: UserIn):
        old_data = user.dict()
        return UserOut(id=id, **old_data)
