# app/main.py

from app.api.routes import router as api_router
from app.auth.auth_middleware import AuthMiddleware
from app.auth.routes import router as auth_router
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from starlette.middleware import Middleware

middleware = [
    Middleware(
        CORSMiddleware,
        allow_origins=["*"],
        allow_credentials=True,
        allow_methods=["*"],
        allow_headers=["*"],
    ),
    Middleware(AuthMiddleware),
]


app = FastAPI(middleware=middleware)

app.include_router(auth_router, prefix="/auth")
app.include_router(api_router, prefix="/api")
