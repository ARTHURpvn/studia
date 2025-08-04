import requests
from app.config import SUPABASE_KEY, SUPABASE_URL
from app.dependencies import build_tree, get_current_user_id
from fastapi import APIRouter, Header
from pydantic import BaseModel

router = APIRouter()

# Criar Anotacao
@router.post("/{folder_id}")
def create_annotation(
        folder_id: str,
        authorization: str = Header(...)
):
    print("-=-=-=-=-=-=-=-=-=-=-=-=-| Create Annotation  |-=-=-=-=-=-=-=-=-=-=-=-=-\n")

    header = {
        "apikey": SUPABASE_KEY,
        "Authorization": authorization,
    }

    data = {
        "parent_id": folder_id,
    }

    print(f"Header received: {header}\n Data received: {data} ")

    try:
        requests.post(f"{SUPABASE_URL}/rest/v1/annotations", headers=header, json=data)
        print("annotation created successfully")
        print("-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-\n\n")

        return {
            "message": "Anotacao Criada com sucesso!",
            "status_code": 201
        }


    except Exception as e:
        print("receive a error")
        print("-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-\n\n")

        return {
            "message": "Erro ao criar a anotacao",
            "status_code": 500,
            "error": str(e)
        }


# Pegar uma anotacao
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
    print("-=-=-=-=-=-=-=-=-=-=-=-=-| Get Annotation  |-=-=-=-=-=-=-=-=-=-=-=-=-\n")


    try:
        response = requests.get(f"{SUPABASE_URL}/rest/v1/annotations", headers=header, params=params, json=data)
        data = response.json()
        print(data[0]["content"])
        print("-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-\n\n")

        return {
            "message": "Anotacao Criada com sucesso!",
            "status_code": response.status_code,
            "annotations": data[0]["content"],
        }

    except Exception as e:
        print("-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-\n\n")
        return {
            "message": "Erro ao criar a anotacao",
            "status_code": 500,
            "error": str(e)
        }

class EditAnnotation(BaseModel):
    content: object


@router.patch("/{folder_id}")
def update_annotation(
        folder_id: str,
        request: EditAnnotation,
        authorization: str = Header(...),
):
    header = {
        "apikey": SUPABASE_KEY,
        "Authorization": authorization,
    }
    data = {
        "content": request.content
    }

    try:
        response = requests.patch(f"{SUPABASE_URL}/rest/v1/annotations?parent_id=eq.{folder_id}", headers=header, json=data)
        data = response.json()
        print(data[0]["content"])

        return {
            "message": "Anotacao Salva com sucesso!",
            "status_code": response.status_code
        }
    except Exception as e:
        return {
            "message": "Erro ao atualizar a anotacao",
            "status_code": 500,
            "error": str(e)
        }


@router.delete("/{folder_id}")
def delete_annotation(
        folder_id: str,
        authorization: str = Header(...),
):
    header = {
        "apikey": SUPABASE_KEY,
        "Authorization": authorization,
    }

    try:
        response = requests.delete(f"{SUPABASE_URL}/rest/v1/annotations/?parent_id=eq.{folder_id}", headers=header)
        data = response.json()
        print(data[0]["content"])
        return {
            "message": "Anotacao Excluida com sucesso!",
            "status_code": response.status_code
        }

    except Exception as e:
        return {
            "message": "Erro ao excluir a anotacao",
            "status_code": 500,
            "error": str(e)
        }