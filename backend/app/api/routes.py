from app.api import folders, annotations, materia
from app.config import SUPABASE_KEY, SUPABASE_URL
from app.db.supabase_client import supabase
from fastapi import APIRouter

router = APIRouter()

router.include_router(folders.router, prefix="/folders", tags=["Folders"])
router.include_router(annotations.router, prefix="/annotations", tags=["Annotations"])
router.include_router(materia.router, prefix="/materia", tags=["Materia"])