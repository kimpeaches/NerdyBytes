from fastapi import (
    Depends,
    HTTPException,
    status,
    APIRouter,
    Request,
    Response,
)
from typing import List, Union
from pydantic import BaseModel
from queries.deck import DeckIn, DeckRepository, DeckOut, Error
from authenticator import authenticator


class NoDeckError(ValueError):
    pass


class DeckForm(BaseModel):
    name: str
    user_id: int


class HttpError(BaseModel):
    detail: str


router = APIRouter()


@router.post("/api/deck", response_model=DeckIn)
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


@router.get("/api/deck/{deck_id}", response_model=DeckOut)
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


@router.put("/api/deck/{deck_id}", response_model=Union[DeckOut, Error])
def update_deck(
    deck_id: int,
    info: DeckIn,
    response: Response,
    account_data: dict = Depends(authenticator.get_current_account_data),
    repo: DeckRepository = Depends(),
) -> Union[DeckOut, Error]:
    try:
        deck = repo.update(deck_id, info)
    except NoDeckError:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Cannot update deck.",
        )
    return deck


@router.get("/api/deck", response_model=Union[List[DeckOut], Error])
def get_all_decks(
    account_data: dict = Depends(authenticator.get_current_account_data),
    repo: DeckRepository = Depends(),
):
    return repo.get_all()


@router.delete("/api/deck/{deck_id}", response_model=bool)
async def delete_deck(
    request: Request,
    deck_id: int,
    account_data: dict = Depends(authenticator.get_current_account_data),
    repo: DeckRepository = Depends(),
) -> bool:
    try:
        result = repo.delete(deck_id)
    except NoDeckError:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Cannot delete deck.",
        )
    return result
