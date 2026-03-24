from dataclasses import dataclass
from typing import Optional, List, Dict, Any

@dataclass
class Model3DMediaResource:
    id: str = None
    uuid: str = None
    url: str = None
    bytes: List[str] = None
    local_file: Dict[str, Any] = None
    base64: str = None
    type: str = None
    mime_type: str = None
    size: float = None
    name: str = None
    extension: str = None
    tags: Dict[str, Any] = None
    metadata: Dict[str, Any] = None
    prompt: str = None
    created_at: str = None
    updated_at: str = None
    creator_id: str = None
    description: str = None
    format: str = None
    vertex_count: float = None
    face_count: float = None
    material_count: float = None
    bone_count: float = None
    animation_count: float = None
    bounding_box: Dict[str, Any] = None
    preview_url: str = None
    texture_urls: List[str] = None
