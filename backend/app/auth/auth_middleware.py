from app.db.supabase_client import supabase
from fastapi import Request, HTTPException
from starlette.middleware.base import BaseHTTPMiddleware

class AuthMiddleware(BaseHTTPMiddleware):
    async def dispatch(self, request: Request, call_next):
        path = request.url.path
        if request.method == "OPTIONS":
            return await call_next(request)

        if path.startswith("/api/"):
            auth_header = request.headers.get("Authorization", "")
            token = auth_header.replace("Bearer ", "").strip()
            method = request.method
            print("-=-=-=-=-=-=-=-=-=-=-=-=-| Middleware |-=-=-=-=-=-=-=-=-=-=-=-=-\n")

            print(f"Rota protegida: {method} {path}")
            print(f"Token: {auth_header}")
            if not token:
                print("Nenhum token fornecido")
                raise HTTPException(status_code=401, detail="Token de autenticação ausente\n")

            try:
                user_response = supabase.auth.get_user(token)
                user = getattr(user_response, "user", None)
                if not user:
                    print("Token inválido ou usuário não encontrado\n")
                    raise HTTPException(status_code=401, detail="Token inválido ou expirado\n")


                request.state.user = user
                print(f"Usuário autenticado: {user.id}\n")
                print("-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-\n\n")

            except Exception as e:
                print(f"Erro na verificação do token: {repr(e)}\n")
                raise HTTPException(status_code=401, detail="Erro na autenticação com o Supabase\n")

        return await call_next(request)
