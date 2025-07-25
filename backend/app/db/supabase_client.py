from app.config import SUPABASE_URL, SUPABASE_KEY
from supabase import create_client, Client


def get_supabase() -> Client:
    return create_client(SUPABASE_URL, SUPABASE_KEY)

supabase = get_supabase()
