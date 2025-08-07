from app.config import SUPABASE_KEY
from app.db.supabase_client import supabase
from fastapi import APIRouter, HTTPException, Header
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
        url = "https://rwbidcjnmersbhgkzbpg.supabase.co/auth/v1/callback"
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


@router.get("/logout")
def logout(authorization: str = Header(...)):

    headers = {
        "apikey": SUPABASE_KEY,
        "Authorization": authorization
    }
    try:
        response = requests.post(f"{SUPABASE_URL}/auth/v1/logout", headers=headers)
        return {
            "message": "Desconectado com sucesso!",
            "status_code": response.status_code
        }


    except Exception as e:
        return {
            "message": "Erro ao logout",
            "status_code": 401,
            "error": str(e)

        }


@router.get("/token")
def validate_token(authorization: str = Header(...)):
    try:
        # Extract token from Authorization header
        token = authorization.replace("Bearer ", "")

        # Validate token with Supabase
        response = supabase.auth.get_user(token)

        # If we get here, the token is valid
        return {"valid": True}
    except Exception as e:
        # Token is invalid or expired
        return JSONResponse(
            status_code=401,
            content={"valid": False, "reason": "invalid-token", "error": str(e)}
        )