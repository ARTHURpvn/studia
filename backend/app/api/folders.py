from typing import Optional

import requests
from app.config import SUPABASE_KEY, SUPABASE_URL
from app.dependencies import build_tree, get_current_user_id
from fastapi import APIRouter, Depends, Header
from pydantic import BaseModel

router = APIRouter()

# Rota para pegar todas as pastas
@router.get("/")
def get_folders(authorization: str = Header(...)):
    headers = {
        "apikey": SUPABASE_KEY,
        "Authorization":  authorization
    }

    params = {
        "select": "id, name, type, is_materia, parent_id",
    }
    print("-=-=-=-=-=-=-=-=-=-=-=-=-| Request folders |-=-=-=-=-=-=-=-=-=-=-=-=-\n")
    try:
        response = requests.get(f"{SUPABASE_URL}/rest/v1/folders", headers=headers, params=params)
        print(f"Materia received: {response.json()}")

        # Funcao para montar json com o children
        folder_tree = build_tree(response.json())
        print("-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-\n\n")

        return {
            "folders": folder_tree,
        }
    except Exception as e:
        return {
            "message": "Erro ao buscar a Pasta!",
            "status_code": 500,
            "error": str(e)
        }



# Requisitos para criar pasta
class CreateFolderRequest(BaseModel):
    name: str
    type: str
    is_materia: bool
    parent_id: Optional[str] = None

# Rota para criar pasta
@router.post("/")
def create_folder(
    request: CreateFolderRequest,
    user_id: str = Depends(get_current_user_id),
    authorization: str = Header(...)
):
    headers = {
        "apikey": SUPABASE_KEY,
        "Authorization": authorization,
        "Prefer": "return=representation"  # <- Necessário para retornar o id
    }

    form_data = {
        "name": request.name,
        "user_id": user_id,
        "type": request.type,
        "is_materia": request.is_materia
    }

    print("-=-=-=-=-=-=-=-=-=-=-=-=-| Create Folder |-=-=-=-=-=-=-=-=-=-=-=-=-\n")
    print(f"Form: {form_data}")

    try:
        if request.parent_id:
            form_data["parent_id"] = request.parent_id
            print(f"Parent ID: {request.parent_id}")

        response = requests.post(
            f"{SUPABASE_URL}/rest/v1/folders",
            headers=headers,
            json=form_data
        )

        print("-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-\n\n")

        created_folder = response.json()[0]
        return {
            "message": "Pasta criada com sucesso!",
            "status_code": response.status_code,
            "folder_id": created_folder.get("id")
        }

    except Exception as e:
        print(f"Error: {str(e)}\n")
        print("-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-\n\n")

        return {
            "message": "Erro ao criar a Pasta!",
            "status_code": 500,
            "error": str(e)
        }


class UpdateFolderRequest(BaseModel):
    name: str

# Editando Pasta Informada
@router.patch("/{folder_id}")
def update_folder(
    payload: UpdateFolderRequest,
    folder_id: str,
    authorization: str = Header(...)
):
    headers = {
        "apikey": SUPABASE_KEY,
        "Authorization": authorization
    }

    params = {
        "id": f"eq.{folder_id}",
    }

    data = {
        "name": payload.name
    }
    print("-=-=-=-=-=-=-=-=-=-=-=-=-| Edit Folder |-=-=-=-=-=-=-=-=-=-=-=-=-\n")

    try:
        response = requests.patch(f"{SUPABASE_URL}/rest/v1/folders", headers=headers, params=params, json=data)
        print(f"Folder edited successfully With response code: {response.status_code}\n")
        print("-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-\n\n")

        return {
            "message": f"Pasta atualizada com sucesso!",
            "status_code": response.status_code,
        }

    except Exception as e:
        print(f"[update Folder] Error: {str(e)}")
        return {
            "message": "Erro ao atualizar a Pasta!",
            "status_code": 500,
            "error": str(e)
        }


# Excluindo pasta informada
@router.delete("/{folder_id}")
def delete_folder( folder_id: str, authorization: str = Header(...) ):
    headers = {
        "apikey": SUPABASE_KEY,
        "Authorization": authorization
    }

    params = {
        "id": f"eq.{folder_id}"
    }
    print("-=-=-=-=-=-=-=-=-=-=-=-=-| Delete Folder |-=-=-=-=-=-=-=-=-=-=-=-=-\n")

    print(f"Header Recebido: {headers}")
    print(f"Params para Deletar: {params}")

    try:
        print("Deletando...")
        response = requests.delete(f"{SUPABASE_URL}/rest/v1/folders", headers=headers, params=params)
        print(f"Response: {response.status_code}\n")
        print("-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-\n\n")

        return {
            "message": f"Pasta Deletada com sucesso!",
            "status_code": response.status_code,
        }

    except Exception as e:

        print(f"Error: {str(e)}")
        print("-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-| Erro Delete Folder |=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-\n\n")
        return {
            "message": "Erro ao deletar a Pasta!",
            "status_code": 500,
            "error": str(e)
        }
