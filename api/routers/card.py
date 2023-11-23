from fastapi import Depends, HTTPException, status, APIRouter, Request
from pydantic import BaseModel
from queries.card import CardIn, CardRepository
from authenticator import authenticator


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


@router.post("/api/{user_id}/deck/{deck_id}/card", response_model=CardIn)
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
