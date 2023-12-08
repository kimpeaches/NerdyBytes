from fastapi import Depends, HTTPException, status, APIRouter, Request
from pydantic import BaseModel
from queries.card import CardIn, CardRepository, CardOut
from authenticator import authenticator
from typing import List, Union


class Error(BaseModel):
    message: str


class NoCardError(ValueError):
    pass


class CardForm(BaseModel):
    deck_id: int
    question: str
    wrong_count: int
    right_count: int
    flag: bool = False


class HttpError(BaseModel):
    detail: str


router = APIRouter()


@router.post("/api/card", response_model=CardIn)
async def create_card(
    request: Request,
    info: CardForm,
    account_data: dict = Depends(authenticator.get_current_account_data),
    repo: CardRepository = Depends(),
) -> CardIn:
    try:
        card = repo.create(info)
    except NoCardError:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Cannot create a card.",
        )
    return card


@router.get("/api/{deck_id}/card", response_model=List[CardOut])
async def get_all_cards(
    request: Request,
    deck_id: int,
    account_data: dict = Depends(authenticator.get_current_account_data),
    repo: CardRepository = Depends(),
) -> List[CardOut]:
    cards_or_error = repo.get_all(deck_id)
    if isinstance(cards_or_error, Error):
        return []
    return cards_or_error


@router.delete(
    "/api/{user_id}/deck/{deck_id}/card/{card_id}", response_model=bool
)
async def delete_card(
    request: Request,
    card_id: int,
    account_data: dict = Depends(authenticator.get_current_account_data),
    repo: CardRepository = Depends(),
) -> bool:
    try:
        result = repo.delete(card_id)
    except NoCardError:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Cannot delete the card.",
        )
    return result


@router.put(
    "/api/{user_id}/deck/{deck_id}/card/{card_id}",
    response_model=Union[CardOut, Error],
)
def update_card(
    card_id: int,
    card: CardIn,
    account_data: dict = Depends(authenticator.get_current_account_data),
    repo: CardRepository = Depends(),
) -> Union[CardOut, Error]:
    return repo.update(card_id, card)


@router.get(
    "/api/{user_id}/deck/{deck_id}/card/{card_id}", response_model=CardOut
)
def get_one_card(
    request: Request,
    card_id: int,
    account_data: dict = Depends(authenticator.get_current_account_data),
    repo: CardRepository = Depends(),
) -> CardOut:
    try:
        card = repo.get_one(card_id)
    except NoCardError:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Card not found.",
        )

    return card
