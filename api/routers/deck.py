from fastapi import (
    Depends,
    HTTPException,
    status,
    APIRouter,
    Request,
)
from pydantic import BaseModel
from queries.deck import DeckIn, DeckRepository, DeckOut
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


@router.get("/api/{user_id}/deck/{deck_id}", response_model=DeckOut)
def get_one_deck(
    request: Request,
    deck_id: int,
    account_data: dict = Depends(authenticator.get_current_account_data),
    repo: DeckRepository = Depends(),
) -> DeckOut:
    try:
        deck = repo.get_one(deck_id)
    except NoDeckError:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Deck not found.",
        )

    return deck
