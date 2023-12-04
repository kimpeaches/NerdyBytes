from pydantic import BaseModel
from datetime import date
from typing import List, Union
from queries.pool import pool


class Error(BaseModel):
    message: str


class DatesIn(BaseModel):
    user_id: int
    date: date
    studied_today: bool


class DatesOut(BaseModel):
    id: int
    user_id: int
    date: date
    studied_today: bool


class DatesRepository:
    def get_all(self) -> Union[List[DatesOut], Error]:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    db.execute(
                        """
                        SELECT date.id
                        , date.user_id
                        , date.date
                        , date.studied_today
                        FROM date
                        ORDER BY date;
                        """
                    )
                    result = []
                    records = db.fetchall()
                    for record in records:
                        print(record)
                        dates = DatesOut(
                            id=record[0],
                            user_id=record[1],
                            date=record[2],
                            studied_today=record[3],
                        )
                        result.append(dates)
                    return result

        except Exception as e:
            print(e)
            return {"message": "Could not get all dates"}
