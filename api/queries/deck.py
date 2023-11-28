from pydantic import BaseModel, ValidationError
from queries.accounts import pool
from typing import Union


class Error(BaseModel):
    message: str


class DeckIn(BaseModel):
    name: str
    user_id: int
    public_status: bool = False
    study_count: int = 0
    total_cards: int = 0


class DeckOut(BaseModel):
    id: int
    user_id: int
    name: str
    public_status: bool = False
    study_count: int = 0
    total_cards: int = 0


class DeckRepository:
    def update(self, deck_id: int, info: DeckIn) -> Union[DeckOut, Error]:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    db.execute(
                        """
                        UPDATE deck
                        SET user_id = %s
                            , name = %s
                            , public_status = %s
                            , study_count = %s
                            , total_cards = %s
                            WHERE id = %s
                        """,
                        [
                            info.user_id,
                            info.name,
                            info.public_status,
                            info.study_count,
                            info.total_cards,
                            deck_id,
                        ],
                    )
                    return self.deck_in_to_out(deck_id, info)
        except Exception as e:
            print(e)
            return {"message": "Could not update a deck"}

    def get_one(self, id: int) -> Union[DeckOut, Error]:
        with pool.connection() as conn:
            with conn.cursor() as db:
                result = db.execute(
                    """
                    SELECT * FROM deck WHERE id = %s;
                    """,
                    [id],
                )
                deck = result.fetchone()
                if deck is None:
                    return Error(message="Deck not found")
                return DeckOut(
                    id=deck[0],
                    user_id=deck[1],
                    name=deck[5],
                    public_status=deck[2],
                    study_count=deck[3],
                    total_cards=deck[4],
                )

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
