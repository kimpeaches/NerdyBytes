import os
from fastapi import FastAPI
from routers import user, deck, card, option, chat_room, message, dates
from authenticator import authenticator
from fastapi.middleware.cors import CORSMiddleware


app = FastAPI()


app.add_middleware(
    CORSMiddleware,
    allow_origins=[os.environ.get("CORS_HOST")],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/")
def root():
    return {"message": "You hit the root path!"}


app.include_router(user.router)
app.include_router(authenticator.router)
app.include_router(deck.router)
app.include_router(card.router)
app.include_router(option.router)
app.include_router(chat_room.router)
app.include_router(message.router)
app.include_router(dates.router)
