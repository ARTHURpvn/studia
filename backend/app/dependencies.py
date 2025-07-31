import jwt
from fastapi import Header, HTTPException


def get_current_user_id(authorization: str = Header(...)) -> str:
    token = authorization.replace("Bearer ", "")

    try:
        decoded = jwt.decode(token, options={"verify_signature": False})
        user_id = decoded.get("sub")
        if not user_id:
            raise ValueError("Token inválido: 'sub' não encontrado")
        return user_id
    except Exception as e:
        raise HTTPException(status_code=401, detail=f"Token inválido: {str(e)}")



def build_tree(folders, parent_id=None):
    tree = []
    print(f"\n[BuildTree] Tree: {folders}")
    for folder in folders:
        if folder["parent_id"] == parent_id:
            children = build_tree(folders, folder["id"])
            folder["children"] = children
            tree.append(folder)
    return tree