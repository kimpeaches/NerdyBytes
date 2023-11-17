from fastapi import APIRouter, Depends
from queries.user import UserIn, UserOut, UserRepository, Error
from typing import Union

router = APIRouter()


@router.post("/user", response_model=Union[UserOut, Error])
def create_user(
    user: UserIn,
    # response: Response,
    repo: UserRepository = Depends(),
):
    # response.status_code = 400
    return repo.create(user)
