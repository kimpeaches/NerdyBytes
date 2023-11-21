from fastapi import FastAPI
from routers import user, deck
from authenticator import authenticator

app = FastAPI()
app.include_router(user.router)
app.include_router(authenticator.router)
app.include_router(deck.router)
