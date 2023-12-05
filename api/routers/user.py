from fastapi import (
    Depends,
    HTTPException,
    status,
    Response,
    APIRouter,
    Request,
)

from typing import List
from jwtdown_fastapi.authentication import Token
from authenticator import authenticator

from pydantic import BaseModel

from queries.user import (
    LoginUserIn,
    UserIn,
    UserOut,
    UserRepository,
    DuplicateAccountError,
)


class UserForm(BaseModel):
    username: str
    password: str
    picture_url: str


class UserToken(Token):
    account: UserOut


class HttpError(BaseModel):
    detail: str


router = APIRouter()


@router.get("/api/users/")
async def get_all_users(
    accounts: UserRepository = Depends(),
    _=Depends(authenticator.get_current_account_data),
) -> List[UserOut]:
    users = accounts.get_list()
    return users


@router.get("/api/user/{id}")
async def get_user(
    id: int,
    accounts: UserRepository = Depends(),
    _=Depends(authenticator.get_current_account_data),
) -> UserOut:
    account = accounts.get_user_by_id(id)
    return account


@router.post("/api/user", response_model=UserToken | HttpError)
async def create_User(
    info: UserIn,
    request: Request,
    response: Response,
    repo: UserRepository = Depends(),
):
    hashed_password = authenticator.hash_password(info.password)
    try:
        user = repo.create(info, hashed_password)
    except DuplicateAccountError:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Cannot create an User with those credentials",
        )

    form = UserForm(
        username=info.username,
        password=info.password,
        picture_url=info.picture_url,
    )

    token = await authenticator.login(response, request, form, repo)
    return UserToken(account=user, **token.dict())


@router.post("/token", response_model=UserToken)
async def post_token(
    request: Request,
    response: Response,
    repo: UserRepository = Depends(),
    form: LoginUserIn = Depends(LoginUserIn.as_form),
):
    token = await authenticator.login(response, request, form, repo)
    user = repo.get(form.username)
    return UserToken(account=user, **token.dict())


@router.get("/token")
async def get_by_cookie(
    request: Request,
    account_data: dict
    | None = Depends(authenticator.try_get_current_account_data),
    accounts: UserRepository = Depends(),
    ra=Depends(authenticator.get_current_account_data),
) -> UserToken:
    account = await get_user(account_data["id"], accounts=accounts)
    return {
        "access_token": request.cookies[authenticator.cookie_name],
        "type": "Bearer",
        "account": account,
    }


@router.put("/api/user/{id}")
async def update_user(
    id: int,
    info: UserIn,
    repo: UserRepository = Depends(),
    current_account_data: dict = Depends(
        authenticator.get_current_account_data
    ),
):
    hashed_password = authenticator.hash_password(info.password)
    user = repo.update(id, info.username, hashed_password, info.picture_url)
    return user
