from typing import Optional

import requests
from app.config import SUPABASE_KEY, SUPABASE_URL
from app.dependencies import build_tree, get_current_user_id
from fastapi import APIRouter, Header
from pydantic import BaseModel

router = APIRouter()

class CreateMateria(BaseModel):
    name: Optional[str]
    is_materia: Optional[bool]
    teacher: Optional[str]
    folder_id: Optional[str]
    semester: Optional[int]
    media: Optional[float]



@router.post("/")
def create_materia(
        request: CreateMateria,
        authorization_token: str = Header(...),
):
    headers = {
        "apikey": SUPABASE_KEY,
        "Authorization": f"Bearer {authorization_token}",
    }

    data = {
        "name": request.name,
        "is_materia": request.is_materia,
        "teacher": request.teacher,
        "folder_id": request.folder_id,
        "semester": request.semester,
        "media": request.media,
    }

    try:
        response = requests.post(f"{SUPABASE_URL}/rest/v1/materia", headers=headers, json=data)
        return {
            "message": "Materia Criada com Sucesso",
            "status_code": response.status_code,
        }
    except Exception as e:
        return {
            "message": "Erro ao criar materia",
            "status_code": 500,
            "error": str(e),
        }


@router.get("/{folder_id}")
def read_materia(
        folder_id: str,
        authorization: str = Header(...),
):
    headers = {
        "apikey": SUPABASE_KEY,
        "Authorization": authorization,
    }
    params = {
        "select": "content"
    }
    data = {
        "folder_id": folder_id,
    }

    try:
        response = requests.get(f"{SUPABASE_URL}/rest/v1/materia", headers=headers, params=params, json=data)
        return {
            "message": "Materia Receber com Sucesso",
            "status_code": response.status_code,
            "data": response.json(),
        }
    except Exception as e:
        return {
            "message": "Erro ao receber materia",
            "status_code": 500,
            "error": str(e),
        }


@router.patch("/{folder_id}")
def update_materia(
        request: CreateMateria,
        folder_id: str,
        authorization_token: str = Header(...),
):
    data = {}
    headers = {
        "apikey": SUPABASE_KEY,
        "Authorization": authorization_token,
    }

    if request.name: data["name"] = request.name
    if request.is_materia: data["is_materia"] = request.is_materia
    if request.teacher: data["teacher"] = request.teacher
    if request.semester: data["semester"] = request.semester
    if request.media: data["media"] = request.media

    try:
        response = requests.patch(f"{SUPABASE_URL}/rest/v1/materia?folder_id=eq.{folder_id}", headers=headers, json=data)
        return {
            "message": "Materia Editado com Sucesso",
            "status_code": response.status_code,
        }

    except Exception as e:
        return {
            "message": "Erro ao editar materia",
            "status_code": 500,
            "error": str(e),
        }


@router.delete("/{folder_id}")
def delete_materia(
        folder_id: str,
        authorization: str = Header(...),
):
    header = {
        "apikey": SUPABASE_KEY,
        "Authorization": authorization,
    }

    try:
        response = requests.delete(f"{SUPABASE_URL}/rest/v1/materia/?parent_id=eq.{folder_id}", headers=header)
        data = response.json()
        print(data[0]["content"])
        return {
            "message": "Materia Excluida com sucesso!",
            "status_code": response.status_code
        }

    except Exception as e:
        return {
            "message": "Erro ao excluir a materia",
            "status_code": 500,
            "error": str(e)
        }