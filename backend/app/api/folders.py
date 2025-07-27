from typing import Optional

import requests
from app.config import SUPABASE_KEY, SUPABASE_URL
from app.dependencies import build_tree, get_current_user_id
from fastapi import APIRouter, Depends, Header, HTTPException
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
    try:
        response = requests.get(f"{SUPABASE_URL}/rest/v1/folders", headers=headers, params=params)
        print(f"[get Folders] Materias recebidas: {response.json()}")

        # Funcao para montar json com o children
        folder_tree = build_tree(response.json())

        return folder_tree
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Erro ao buscar pastas: {str(e)}")


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
        "Authorization":  authorization
    }

    form_data = {
        "name": request.name, "user_id": user_id, "type": request.type, "is_materia": request.is_materia
    }

    print(f"[create Folder] Form: {form_data}")

    try:
        if request.parent_id:
            form_data["parent_id"] = request.parent_id
            print(f"[create Folder] Parent ID: {request.parent_id}")

        response = requests.post(f"{SUPABASE_URL}/rest/v1/folders", headers=headers, json=form_data)
        print(f"[create Folder] Folder created successfully: {response.status_code}")

        return response.status_code
    except Exception as e:
        print(f"[create Folder] Error: {str(e)}")
        raise HTTPException(status_code=500, detail=f"Erro ao criar pasta: {str(e)}")


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

    try:
        response = requests.patch(f"{SUPABASE_URL}/rest/v1/folders", headers=headers, params=params, json=data)
        print(f"[update Folder] Response: {response.status_code}")
        return {"message": f"Pasta atualizada com sucesso!"}

    except Exception as e:
        print(f"[update Folder] Error: {str(e)}")
        raise HTTPException(status_code=500, detail=f"Erro ao editar a pasta: {str(e)}")


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

    try:
        response = requests.delete(f"{SUPABASE_URL}/rest/v1/folders", headers=headers, params=params)
        print(f"[delete Folder] Response: {response.status_code}")
        return {"message": f"Pasta atualizada com sucesso!"}

    except Exception as e:
        print(f"[delete Folder] Error: {str(e)}")
        raise HTTPException(status_code=500, detail=f"Erro ao editar a pasta: {str(e)}")
