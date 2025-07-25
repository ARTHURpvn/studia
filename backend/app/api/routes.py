from app.db.supabase_client import supabase
from fastapi import APIRouter, Header, HTTPException

router = APIRouter()

@router.get("/me")
def get_profile(authorization: str = Header(...)):
    token = authorization.replace("Bearer ", "")

    try:
        user = supabase.auth.get_user(token)
        return user
    except Exception:
        raise HTTPException(status_code=401, detail="Unauthorized")
