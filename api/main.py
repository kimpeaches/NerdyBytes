import os
from fastapi import FastAPI
from routers import user, deck, card, option, chat_room, message
from authenticator import authenticator
from fastapi.middleware.cors import CORSMiddleware


app = FastAPI()


app.add_middleware(
    CORSMiddleware,
    allow_origins=[os.environ.get("CORS_HOST", "http://localhost:3000")],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


app.include_router(user.router)
app.include_router(authenticator.router)
app.include_router(deck.router)
app.include_router(card.router)
app.include_router(option.router)
app.include_router(chat_room.router)
app.include_router(message.router)
