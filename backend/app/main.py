# app/main.py

from app.api.routes import router as api_router
from app.auth.auth_middleware import AuthMiddleware
from app.auth.routes import router as auth_router
from fastapi import FastAPI
from starlette.middleware import Middleware

app = FastAPI(middleware=[Middleware(AuthMiddleware)])

app.include_router(auth_router, prefix="/auth")
app.include_router(api_router, prefix="/api")
