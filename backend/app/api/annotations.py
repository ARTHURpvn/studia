import requests
from app.config import SUPABASE_KEY, SUPABASE_URL
from app.dependencies import build_tree, get_current_user_id
from fastapi import APIRouter, Header, HTTPException
from pydantic import BaseModel

router = APIRouter()


class CreateNoteRequest(BaseModel):
    parent_id: str


@router.post("/")
def create_annotation(
        request: CreateNoteRequest,
        authorization: str = Header(...)
):
    header = {
        "apikey": SUPABASE_KEY,
        "Authorization": authorization,

    }

    data = {
        "parent_id": request.parent_id,
    }

    print(header)
    try:
        requests.post(f"{SUPABASE_URL}/rest/v1/annotations", headers=header, json=data)
        print({"message": "ano"})

    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Erro ao Criar anotacao: {str(e)}")



@router.get("/{folder_id}")
def read_annotations(
        folder_id: str,
        authorization: str = Header(...)
):
    header = {
        "apikey": SUPABASE_KEY,
        "Authorization": authorization,
    }

    params = {
        "select": "content"
    }

    data = {
        "parent_id": f"eq.{folder_id}",
    }

    try:
        response = requests.get(f"{SUPABASE_URL}/rest/v1/annotations", headers=header, params=params, json=data)
        data = response.json()
        print(data[0]["content"])

        return data[0]["content"]

    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Erro ao buscar anotacao: {str(e)}")
