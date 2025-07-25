from app.db.supabase_client import supabase
from fastapi import APIRouter, HTTPException
from pydantic import BaseModel

router = APIRouter()

class LoginRequest(BaseModel):
    email: str
    password: str

class SignupRequest(BaseModel):
    name: str
    username: str
    email: str
    password: str

@router.post("/login")
def login(request: LoginRequest):
    try:
        response = supabase.auth.sign_in_with_password({
            "email": request.email,
            "password": request.password
        })

        if not response.session or not response.session.access_token:
            raise HTTPException(status_code=401, detail="Invalid login or missing token")

        user_metadata = response.user.user_metadata if response.user else {}


        return {
            "id": response.user.id,
            "access_token": response.session.access_token,
            "name": user_metadata["name"],
            "username": user_metadata["username"]
        }

    except Exception:
        raise HTTPException(status_code=401, detail="Invalid credentials")


@router.get("/google")
def login():
    try:
        url = f"https://rwbidcjnmersbhgkzbpg.supabase.co/auth/v1/callback"
        return {"url": url}
    except Exception as e:
        raise HTTPException(status_code=401, detail="Erro ao gerar URL do Google")


@router.post("/signup")
def signup(request: SignupRequest):
    try:
        response = supabase.auth.sign_up({
            "email": request.email,
            "password": request.password,
            "options": {
                "data": {
                    "name": request.name,
                    "username": request.username,
                }
            }
        })

        if response.session and not response.session.access_token:
            return JSONResponse(
                {"message": "Usuário criado, mas precisa confirmar o email."}, status_code=201
            )

    except Exception:
        raise HTTPException(status_code=401, detail="Invalid credentials")



