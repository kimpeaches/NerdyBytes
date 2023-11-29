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
    def get_by_username(self, username: str) -> MessageOut:
        # with pool.connection() as conn:
        with pool.connection() as conn:
            with conn.cursor() as db:
                result = db.execute(
                    """
                    SELECT *
                    FROM message
                    WHERE username = %s
                    """,
                    [username],
                )
                messages = result.fetchall()
                result_messages = []
                for message in messages:
                    result_messages.append(
                        MessageOut(
                            id=message[0],
                            text=message[1],
                            username=message[2],
                            created=message[3],
                        )
                    )
                return result_messages

    def create(
        self,
        info: MessageIn,
    ) -> Union[MessageOut, Error]:
        with pool.connection() as conn:
            with conn.cursor() as db:
                result = db.execute(
                    """
                    INSERT INTO message
                        (username, text, created)
                    VALUES
                        (%s, %s, %s)
                    RETURNING id;
                    """,
                    [
                        info.username,
                        info.text,
                        time.strftime("%Y-%m-%d %H:%M:%S"),
                    ],
                )
                id = result.fetchone()[0]
                return self.message_in_to_out(id, info)

    def message_in_to_out(self, id: int, message: MessageIn):
        old_data = message.dict()
        old_data["created"] = time.strftime("%Y-%m-%d %H:%M:%S")
        return MessageOut(id=id, **old_data)
