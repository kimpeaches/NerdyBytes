from pydantic import BaseModel
from queries.pool import pool
from typing import Union, Type
import inspect
from fastapi import Form
from pydantic.fields import ModelField


def as_form(cls: Type[BaseModel]):
    """
    Decorator function that converts the class into a form representation.

    Args:
        cls (Type[BaseModel]): The class to be converted.

    Returns:
        Type[BaseModel]: The converted class.
    """
    new_parameters = []

    for field_name, model_field in cls.__fields__.items():
        model_field: ModelField

        new_parameters.append(
            inspect.Parameter(
                model_field.alias,
                inspect.Parameter.POSITIONAL_ONLY,
                default=Form(...)
                if model_field.required
                else Form(model_field.default),
                annotation=model_field.outer_type_,
            )
        )

    async def as_form_func(**data):
        return cls(**data)

    sig = inspect.signature(as_form_func)
    sig = sig.replace(parameters=new_parameters)
    as_form_func.__signature__ = sig
    setattr(cls, "as_form", as_form_func)
    return cls


class DuplicateAccountError(ValueError):
    pass


class Error(BaseModel):
    message: str


@as_form
class LoginUserIn(BaseModel):
    username: str
    password: str


class UserIn(BaseModel):
    username: str
    password: str
    picture_url: str


class UserOut(BaseModel):
    id: int
    username: str
    picture_url: str


class UserOutWithPassword(UserOut):
    hashed_password: str
    picture_url: str


class UserRepository:
    def get_list(self) -> UserOut:
        with pool.connection() as conn:
            with conn.cursor() as db:
                db.execute(
                    """
                    SELECT id, picture_url, username
                    FROM users
                    """
                )
                result = []
                users = db.fetchall()
                for user in users:
                    u = UserOut(
                        id=user[0],
                        picture_url=user[1],
                        username=user[2],
                    )
                    result.append(u)
                return result

    def get_user_by_id(self, id: str) -> UserOutWithPassword:
        with pool.connection() as conn:
            with conn.cursor() as db:
                result = db.execute(
                    """
                    SELECT *
                    FROM users
                    WHERE id = %s
                    """,
                    [id],
                )
                user = result.fetchone()
                return UserOutWithPassword(
                    id=user[0],
                    picture_url=user[1],
                    username=user[2],
                    hashed_password=user[3],
                )

    def get(self, username: str) -> UserOutWithPassword:
        with pool.connection() as conn:
            with conn.cursor() as db:
                result = db.execute(
                    """
                    SELECT *
                    FROM users
                    WHERE username = %s
                    """,
                    [username],
                )
                user = result.fetchone()
                return UserOutWithPassword(
                    id=user[0],
                    picture_url=user[1],
                    username=user[2],
                    hashed_password=user[3],
                )

    def create(
        self, info: UserIn, hashed_password: str
    ) -> Union[UserOut, Error]:
        with pool.connection() as conn:
            with conn.cursor() as db:
                result = db.execute(
                    """
                    INSERT INTO users
                        (username, password, picture_url)
                    VALUES
                        (%s, %s, %s)
                    RETURNING id;
                    """,
                    [info.username, hashed_password, info.picture_url],
                )
                id = result.fetchone()[0]
                return self.user_in_to_out(id, info)

    def user_in_to_out(self, id: int, user: UserIn):
        old_data = user.dict()
        return UserOut(id=id, **old_data)

    def update(
        self, id: int, username: str, hashed_password: str, picture_url: str
    ) -> UserOut:
        with pool.connection() as conn:
            with conn.cursor() as db:
                db.execute(
                    """
                    UPDATE users
                    SET username = %s, password = %s, picture_url = %s
                    WHERE id = %s
                    """,
                    [username, hashed_password, picture_url, id],
                )

        return self.get_user_by_id(id)
