from pydantic import BaseModel, ValidationError
from queries.accounts import pool
from typing import Union


class Error(BaseModel):
    message: str


class CardIn(BaseModel):
    deck_id: int
    question: str
    wrong_count: int
    right_count: int
    flag: bool = False


class CardOut(BaseModel):
    id: int
    deck_id: int
    question: str
    wrong_count: int
    right_count: int
    flag: bool = False


class CardRepository:
    def create(self, info: CardIn) -> Union[CardOut, Error]:
        try:
            info = CardIn(**info.dict())
        except ValidationError as e:
            return Error(message=str(e))

        with pool.connection() as conn:
            with conn.cursor() as db:
                result = db.execute(
                    """
                    INSERT INTO card
                        (deck_id, question, wrong_count, right_count, flag)
                    VALUES
                        (%s, %s, %s, %s, %s)
                    RETURNING id;
                    """,
                    [
                        info.deck_id,
                        info.question,
                        info.wrong_count,
                        info.right_count,
                        info.flag,
                    ],
                )
                id = result.fetchone()[0]
                return self.card_in_to_out(id, info)

    def card_in_to_out(self, id: int, card: CardIn):
        old_data = card.dict()
        return CardOut(id=id, **old_data)
