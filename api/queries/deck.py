from pydantic import BaseModel, ValidationError
from queries.pool import pool
from typing import List, Union


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
    def get_all(self) -> Union[List[DeckOut], Error]:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    result = db.execute(
                        """
                        SELECT deck.id,
                        deck.user_id, deck.name,
                        deck.public_status,
                        deck.study_count,
                        (SELECT COUNT(*) FROM card
                        WHERE card.deck_id = deck.id) as total_cards
                        FROM deck
                        ORDER BY deck.name;
                        """
                    )
                    result = []
                    for record in db:
                        deck = DeckOut(
                            id=record[0],
                            user_id=record[1],
                            name=record[2],
                            public_status=bool(record[3]),
                            study_count=record[4],
                            total_cards=record[5],
                        )
                        result.append(deck)
                    return result
        except Exception as e:
            print(e)
            return {"message": "Could not list all decks!"}

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
                    SELECT deck.*,
                    (SELECT COUNT(*) FROM card
                    WHERE deck_id = deck.id) as total_cards
                    FROM deck WHERE id = %s;
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
                    total_cards=deck[6],
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

    def delete(self, id: int) -> Union[bool, Error]:
        with pool.connection() as conn:
            with conn.cursor() as db:
                db.execute("DELETE FROM card WHERE deck_id = %s", [id])
                result = db.execute("DELETE FROM deck WHERE id = %s", [id])
                if result.rowcount == 0:
                    return Error(message="No deck found to delete")
                return True
