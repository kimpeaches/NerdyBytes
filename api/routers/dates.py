from fastapi import (
    Depends,
    HTTPException,
    APIRouter,
    Request,
    Response,
)
from typing import List
from authenticator import authenticator
from queries.dates import DatesOut, DatesRepository, DatesIn


class NoDateError(ValueError):
    pass


router = APIRouter()


@router.get("/api/dates", response_model=List[DatesOut])
def get_all(
    account_data: dict = Depends(authenticator.get_current_account_data),
    repo: DatesRepository = Depends(),
):
    return repo.get_all()


@router.post("/api/dates", response_model=DatesOut)
def create_dates(
    dates: DatesIn,
    request: Request,
    response: Response,
    account_data: dict = Depends(authenticator.get_current_account_data),
    repo: DatesRepository = Depends(),
) -> DatesOut:
    try:
        dates = repo.add_date(dates)
        return dates
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
