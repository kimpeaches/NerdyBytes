from fastapi import APIRouter, Depends
from typing import List
from authenticator import authenticator
from queries.dates import (
    DatesOut,
    DatesRepository,
)


router = APIRouter()


@router.get("/api/{user_id}/dates", response_model=List[DatesOut])
def get_all(
    account_data: dict = Depends(authenticator.get_current_account_data),
    repo: DatesRepository = Depends(),
):
    return repo.get_all()
