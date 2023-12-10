from fastapi import (
    Depends,
    HTTPException,
    status,
    APIRouter,
    Request,
)
from pydantic import BaseModel
from queries.option import OptionIn, OptionRepository, OptionOut
from authenticator import authenticator


class NoOptionError(ValueError):
    def __init__(self, message: str):
        self.message = message
        super().__init__(self.message)


class OptionForm(BaseModel):
    card_id: int
    possible_answer: str
    is_correct: bool = False


class HttpError(BaseModel):
    detail: str


router = APIRouter()


@router.post("/api/option", response_model=OptionIn)
async def create_option(
    request: Request,
    info: OptionIn,
    account_data: dict = Depends(authenticator.get_current_account_data),
    repo: OptionRepository = Depends(),
) -> OptionIn:
    try:
        option = repo.create(info)
    except NoOptionError as e:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=e.message,
        )
    return option


@router.delete(
    "/api/{user_id}/deck/{deck_id}/card/{card_id}/option/{option_id}",
    response_model=bool,
)
async def delete_option(
    request: Request,
    option_id: int,
    account_data: dict = Depends(authenticator.get_current_account_data),
    repo: OptionRepository = Depends(),
) -> bool:
    try:
        result = repo.delete(option_id)
    except NoOptionError:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Cannot delete option.",
        )
    return result


@router.get("/api/option/{id}", response_model=OptionOut)
async def get_option(
    id: int,
    repo: OptionRepository = Depends(),
    current_account_data: dict = Depends(
        authenticator.get_current_account_data
    ),
):
    return repo.get(id)


@router.get("/api/{card_id}/option", response_model=list[OptionOut])
async def get_options(
    card_id: int,
    request: Request,
    repo: OptionRepository = Depends(),
    current_account_data: dict = Depends(
        authenticator.get_current_account_data
    ),
):
    try:
        options = repo.get_all_options(card_id)
    except NoOptionError:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Cannot get options.",
        )

    return options
