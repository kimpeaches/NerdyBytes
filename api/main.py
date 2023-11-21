import os
from fastapi import FastAPI
from routers import user, deck
from authenticator import authenticator

app = FastAPI()

origins = [
    os.environ.get("CORS_HOST", "http://localhost"),
    "http://localhost:3000",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


app.include_router(user.router)
app.include_router(authenticator.router)
app.include_router(deck.router)
