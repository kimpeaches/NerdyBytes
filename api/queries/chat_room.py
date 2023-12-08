from pydantic import BaseModel, BaseConfig, ValidationError, validator
from pydantic.fields import ModelField
from queries.pool import pool
import time
from typing import Union, Optional
from pydantic.typing import is_union, get_args, get_origin


class Error(BaseModel):
    message: str


class ChatRoomIn(BaseModel):
    user_id: int
    name: str
    messages: str

    @validator("user_id", pre=True)
    def set_user_id(cls, v):
        return int(v)


class ChatRoomOut(BaseModel):
    id: int
    user_id: int
    name: str
    messages: str
    created: Optional[str] = None

    class Config(BaseConfig):
        @classmethod
        def prepare_field(cls, field: ModelField) -> None:
            if is_union(get_origin(field.outer_type_)) and type(
                None
            ) in get_args(field.outer_type_):
                field.required = True


class ChatRoomRepository:
    def get_all(self) -> ChatRoomOut:
        with pool.connection() as conn:
            with conn.cursor() as db:
                db.execute(
                    """
                    SELECT *
                    FROM chat_room
                    """
                )
                result = []
                rooms = db.fetchall()
                for room in rooms:
                    r = ChatRoomOut(
                        id=room[0],
                        user_id=room[2],
                        name=room[3],
                        messages=room[4],
                        created=str(room[1]),
                    )
                    result.append(r)
                return result

    def get_by_id(self, id: int) -> ChatRoomOut:
        with pool.connection() as conn:
            with conn.cursor() as db:
                result = db.execute(
                    """
                  SELECT *
                  FROM chat_room
                  WHERE id = %s
                  """,
                    [id],
                )
                chat_room = result.fetchone()
                return ChatRoomOut(
                    id=chat_room[0],
                    user_id=chat_room[2],
                    name=chat_room[3],
                    messages=chat_room[4],
                    created=str(chat_room[1]),
                )

    def create(self, info: ChatRoomIn) -> Union[ChatRoomOut, Error]:
        try:
            info = ChatRoomIn(**info.dict())
        except ValidationError as e:
            return Error(message=str(e))

        with pool.connection() as conn:
            with conn.cursor() as db:
                result = db.execute(
                    """
                  INSERT INTO chat_room
                      (user_id, name, messages, created)
                  VALUES
                      (%s, %s, %s, %s)
                  RETURNING id;
                  """,
                    [
                        info.user_id,
                        info.name,
                        info.messages,
                        time.strftime("%Y-%m-%d %H:%M:%S"),
                    ],
                )
                id = result.fetchone()[0]
                return self.chat_room_in_to_out(id, info)

    def chat_room_in_to_out(self, id: int, chat_room: ChatRoomIn):
        old_data = chat_room.dict()
        old_data["created"] = time.strftime("%Y-%m-%d %H:%M:%S")
        return ChatRoomOut(id=id, **old_data)

    def delete(self, id: int) -> Union[bool, Error]:
        with pool.connection() as conn:
            with conn.cursor() as db:
                db.execute("DELETE FROM message WHERE chat_room_id = %s", [id])
                result = db.execute(
                    "DELETE FROM chat_room WHERE id = %s", [id]
                )
                if result.rowcount == 0:
                    return Error(message="No room found to delete")
                return True
