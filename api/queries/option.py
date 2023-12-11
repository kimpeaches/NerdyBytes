from pydantic import BaseModel, ValidationError
from queries.pool import pool
from typing import Union


class Error(BaseModel):
    message: str


class OptionIn(BaseModel):
    card_id: int
    possible_answer: str
    is_correct: bool = False


class OptionOut(BaseModel):
    id: int
    card_id: int
    possible_answer: str
    is_correct: bool


class OptionRepository:
    def create(self, info: OptionIn) -> Union[OptionOut, Error]:
        try:
            info = OptionIn(**info.dict())
        except ValidationError as e:
            return Error(message=str(e))

        with pool.connection() as conn:
            with conn.cursor() as db:
                result = db.execute(
                    """
                    INSERT INTO option
                        (card_id, possible_answer, is_correct)
                    VALUES
                        (%s, %s, %s)
                    RETURNING id;
                    """,
                    [
                        info.card_id,
                        info.possible_answer,
                        info.is_correct,
                    ],
                )
                id = result.fetchone()[0]
                return self.option_in_to_out(id, info)

    def option_in_to_out(self, id: int, option: OptionIn):
        old_data = option.dict()
        return OptionOut(id=id, **old_data)

    def delete(self, id: int) -> Union[bool, Error]:
        with pool.connection() as conn:
            with conn.cursor() as db:
                result = db.execute(
                    """
                    DELETE FROM option WHERE id = %s;
                    """,
                    [id],
                )
                if result.rowcount == 0:
                    return Error(message="No option found to delete")
                return True

    def get(self, id: int) -> OptionOut:
        with pool.connection() as conn:
            with conn.cursor() as db:
                result = db.execute(
                    """
                    SELECT *
                    FROM option
                    WHERE id = %s
                    """,
                    [id],
                )
                option = result.fetchone()
                return OptionOut(
                    id=option[0],
                    card_id=option[1],
                    possible_answer=option[2],
                    is_correct=option[3],
                )

    def get_all_options(self, card_id: int) -> list[OptionOut]:
        with pool.connection() as conn:
            with conn.cursor() as db:
                result = db.execute(
                    """
                    SELECT *
                    FROM option
                    WHERE card_id = %s
                    """,
                    [card_id],
                )
                options = result.fetchall()
                return [
                    OptionOut(
                        id=option[0],
                        card_id=option[1],
                        possible_answer=option[2],
                        is_correct=option[3],
                    )
                    for option in options
                ]

    def update(
        self, option_id: int, option: OptionIn
    ) -> Union[OptionOut, Error]:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    db.execute(
                        """
                        UPDATE option
                        SET card_id = %s
                        , possible_answer = %s
                        , is_correct = %s
                        WHERE id = %s
                        """,
                        [
                            option.card_id,
                            option.possible_answer,
                            option.is_correct,
                            option_id,
                        ],
                    )
                    return self.option_in_to_out(option_id, option)
        except Exception as e:
            print(e)
            return {"message": "Could not update an option"}
