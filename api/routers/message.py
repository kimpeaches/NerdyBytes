from fastapi import (
    Depends,
    HTTPException,
    status,
    APIRouter,
    Request,
)
from pydantic import BaseModel
from queries.message import MessageRepository, MessageOut
from authenticator import authenticator


class MessageError(ValueError):
    pass


class MessageForm(BaseModel):
    username: str
    text: str
    chat_room_id: int


class HttpError(BaseModel):
    detail: str


router = APIRouter()


@router.get("/api/messages/{id}", response_model=MessageOut)
def get_messages(
    request: Request,
    message_id: int,
    account_data: dict = Depends(authenticator.get_current_account_data),
    repo: MessageRepository = Depends(),
) -> MessageOut:
    try:
        messages = repo.get_by_id(message_id)

    except MessageError:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Message not found.",
        )

    return messages


@router.post("/api/message", response_model=MessageOut)
async def create_message(
    request: Request,
    info: MessageForm,
    account_data: dict = Depends(authenticator.get_current_account_data),
    repo: MessageRepository = Depends(),
) -> MessageOut:
    try:
        message = repo.create(info)
    except MessageError:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Cannot create a message.",
        )

    return message
