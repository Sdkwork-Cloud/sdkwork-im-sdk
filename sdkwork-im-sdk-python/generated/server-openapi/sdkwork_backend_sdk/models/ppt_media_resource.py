from dataclasses import dataclass
from typing import Optional, List, Dict, Any

@dataclass
class PptMediaResource:
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
    slide_count: float = None
    theme: str = None
    author: str = None
    title: str = None
    notes: str = None
    slide_thumbnails: List[str] = None
