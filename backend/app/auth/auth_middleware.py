from app.db.supabase_client import supabase
from fastapi import Request, HTTPException
from starlette.middleware.base import BaseHTTPMiddleware


class AuthMiddleware(BaseHTTPMiddleware):
    async def dispatch(self, request: Request, call_next):
        path = request.url.path

        # Só aplica autenticação se a rota começar com /api/
        if path.startswith("/api/"):
            auth_header = request.headers.get("Authorization")
            if not auth_header:
                raise HTTPException(status_code=401, detail="Missing Authorization header")

            if not auth_header.startswith("Bearer "):
                raise HTTPException(status_code=401, detail="Invalid Authorization format")

            try:
                token = auth_header.split("Bearer ")[1].strip()
                user_response = supabase.auth.get_user(token)

                # Se não tiver usuário válido, bloqueia
                if not user_response or not user_response.user:
                    raise HTTPException(status_code=401, detail="User not found")

                request.state.user = user_response.user  # Passa o usuário para a rota
            except Exception as e:
                raise HTTPException(status_code=401, detail="Invalid or expired token")

        return await call_next(request)
