from app.db.supabase_client import supabase
from fastapi import Request, HTTPException
from starlette.middleware.base import BaseHTTPMiddleware

class AuthMiddleware(BaseHTTPMiddleware):
    async def dispatch(self, request: Request, call_next):
        path = request.url.path

        if path.startswith("/api/"):
            auth_header = request.headers.get("Authorization", "")
            token = auth_header.replace("Bearer ", "").strip()

            print(f"\n[AuthMiddleware] 🚨 Rota protegida: {path}\n")
            print(f"[AuthMiddleware] 🔍 Token recebido: '{token}'\n")

            if not token:
                print("[AuthMiddleware] ❌ Nenhum token fornecido")
                raise HTTPException(status_code=401, detail="Token de autenticação ausente\n")

            try:
                user_response = supabase.auth.get_user(token)
                print(f"[AuthMiddleware] ✅ Resposta do Supabase: {user_response.user}\n")

                user = getattr(user_response, "user", None)
                if not user:
                    print("[AuthMiddleware] ❌ Token inválido ou usuário não encontrado\n")
                    raise HTTPException(status_code=401, detail="Token inválido ou expirado\n")

                request.state.user = user
                print(f"[AuthMiddleware] 🔐 Usuário autenticado: {user.id}\n")

            except Exception as e:
                print(f"[AuthMiddleware] 💥 Erro na verificação do token: {repr(e)}\n")
                raise HTTPException(status_code=401, detail="Erro na autenticação com o Supabase\n")

        return await call_next(request)
