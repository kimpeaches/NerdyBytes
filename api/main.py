from fastapi import FastAPI
# from fastapi.middleware.cors import CORSMiddleware
# import os
from routers import user

app = FastAPI()
app.include_router(user.router)
