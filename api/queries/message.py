from pydantic import BaseModel, BaseConfig
from queries.accounts import pool
from pydantic.fields import ModelField
import time
from typing import Union, Optional
from pydantic.typing import is_union, get_args, get_origin


class Error(BaseModel):
    message: str


class MessageIn(BaseModel):
    username: str
    text: str
    chat_room_id: int


class MessageOut(BaseModel):
    username: str
    text: str
    id: int
    chat_room_id: int
    created: Optional[str] = None

    class Config(BaseConfig):
        @classmethod
        def prepare_field(cls, field: ModelField) -> None:
            if is_union(get_origin(field.outer_type_)) and type(
                None
            ) in get_args(field.outer_type_):
                field.required = True


class MessageRepository:
    def get_all(self, chat_room_id: int) -> MessageOut:
        # with pool.connection() as conn:
        with pool.connection() as conn:
            with conn.cursor() as db:
                db.execute(
                    """
                    SELECT *
                    FROM message
                    WHERE chat_room_id = %s
                    """,
                    [chat_room_id],
                )
                result = []
                records = db.fetchall()
                for record in records:
                    message = MessageOut(
                        id=record[0],
                        text=record[1],
                        username=record[3],
                        created=str(record[2]),
                        chat_room_id=int(record[4]),
                    )
                    result.append(message)

                return result

    def create(
        self,
        info: MessageIn,
    ) -> Union[MessageOut, Error]:
        with pool.connection() as conn:
            with conn.cursor() as db:
                result = db.execute(
                    """
                    INSERT INTO message
                        (username, text, created, chat_room_id)
                    VALUES
                        (%s, %s, %s, %s)
                    RETURNING id;
                    """,
                    [
                        info.username,
                        info.text,
                        time.strftime("%Y-%m-%d %H:%M:%S"),
                        info.chat_room_id,
                    ],
                )
                id = result.fetchone()[0]
                return self.message_in_to_out(id, info)

    def message_in_to_out(self, id: int, message: MessageIn):
        old_data = message.dict()
        old_data["created"] = time.strftime("%Y-%m-%d %H:%M:%S")
        return MessageOut(id=id, **old_data)
