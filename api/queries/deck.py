from pydantic import BaseModel, ValidationError
from queries.accounts import pool
from typing import Union


class Error(BaseModel):
    message: str


class DeckIn(BaseModel):
    name: str
    user_id: int


class DeckOut(BaseModel):
    id: int
    user_id: int
    name: str


class DeckRepository:
    def create(self, info: DeckIn) -> Union[DeckOut, Error]:
        try:
            info = DeckIn(**info.dict())
        except ValidationError as e:
            return Error(message=str(e))

        with pool.connection() as conn:
            with conn.cursor() as db:
                result = db.execute(
                    """
                    INSERT INTO deck
                        (name, user_id)
                    VALUES
                        (%s, %s)
                    RETURNING id;
                    """,
                    [info.name, info.user_id],
                )
                id = result.fetchone()[0]
                return self.deck_in_to_out(id, info)

    def deck_in_to_out(self, id: int, deck: DeckIn):
        old_data = deck.dict()
        return DeckOut(id=id, **old_data)
