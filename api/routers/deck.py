from fastapi import (
    Depends,
    HTTPException,
    status,
    APIRouter,
    Request,
)
from pydantic import BaseModel
from queries.deck import DeckIn, DeckRepository
from authenticator import authenticator


class NoDeckError(ValueError):
    pass


class DeckForm(BaseModel):
    name: str
    user_id: int


class HttpError(BaseModel):
    detail: str


router = APIRouter()


@router.post("/api/{user_id}/deck", response_model=DeckIn)
async def create_deck(
    request: Request,
    info: DeckIn,
    account_data: dict = Depends(authenticator.get_current_account_data),
    repo: DeckRepository = Depends(),
) -> DeckIn:
    try:
        deck = repo.create(info)
    except NoDeckError:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Cannot create a deck.",
        )

    return deck
