from pydantic import BaseModel, ValidationError
from queries.pool import pool
from typing import Union, List


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
    def update(self, card_id: int, card: CardIn) -> Union[CardOut, Error]:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    db.execute(
                        """
                        UPDATE card
                        SET deck_id = %s
                        , question = %s
                        , wrong_count = %s
                        , right_count = %s
                        , flag = %s
                        WHERE id = %s
                        """,
                        [
                            card.deck_id,
                            card.question,
                            card.wrong_count,
                            card.right_count,
                            card.flag,
                            card_id,
                        ],
                    )
                    return self.card_in_to_out(card_id, card)
        except Exception as e:
            print(e)
            return {"message": "Could not update a card"}

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

    def get_all(self, deck_id: int) -> Union[List[CardOut], Error]:
        with pool.connection() as conn:
            with conn.cursor() as db:
                result = db.execute(
                    """
                    SELECT * FROM card WHERE deck_id = %s;
                    """,
                    [deck_id],
                )
                cards = result.fetchall()
                if not cards:
                    return Error(message="No cards found")
                return [
                    CardOut(
                        id=card[0],
                        deck_id=card[1],
                        question=card[2],
                        wrong_count=card[3],
                        right_count=card[4],
                        flag=card[5],
                    )
                    for card in cards
                ]

    def delete(self, id: int) -> Union[bool, Error]:
        with pool.connection() as conn:
            with conn.cursor() as db:
                result = db.execute(
                    """
                    DELETE FROM card WHERE id = %s;
                    """,
                    [id],
                )
                if result.rowcount == 0:
                    return Error(message="No card found to delete")
                return True
