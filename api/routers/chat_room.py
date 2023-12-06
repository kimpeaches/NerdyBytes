from fastapi import (
    Depends,
    HTTPException,
    status,
    APIRouter,
    Request,
)
from pydantic import BaseModel
from queries.chat_room import (
    ChatRoomIn,
    ChatRoomOut,
    ChatRoomRepository,
)
from authenticator import authenticator
from typing import List


class ChatError(ValueError):
    pass


class ChatForm(BaseModel):
    user_id: int
    name: str
    messages: str


class HttpError(BaseModel):
    detail: str


router = APIRouter()


@router.get("/api/rooms/")
async def get_all_rooms(
    accounts: ChatRoomRepository = Depends(),
    _=Depends(authenticator.get_current_account_data),
) -> List[ChatRoomOut]:
    rooms = accounts.get_all()
    return rooms


@router.get("/api/rooms/{chat_room_id}", response_model=ChatRoomIn)
def get_chat_room(
    request: Request,
    chat_room_id: int,
    account_data: dict = Depends(authenticator.get_current_account_data),
    repo: ChatRoomRepository = Depends(),
) -> ChatRoomIn:
    try:
        chat_room = repo.get_by_id(chat_room_id)
    except ChatError:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Chat not found.",
        )

    return chat_room


@router.post("/api/rooms", response_model=ChatRoomOut)
async def create_chat_room(
    request: Request,
    info: ChatForm,
    account_data: dict = Depends(authenticator.get_current_account_data),
    repo: ChatRoomRepository = Depends(),
) -> ChatRoomOut:
    try:
        info.user_id = int(info.user_id)
        chat_room = repo.create(info)
    except ChatError:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Cannot create a chat room.",
        )

    return chat_room
