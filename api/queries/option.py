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
