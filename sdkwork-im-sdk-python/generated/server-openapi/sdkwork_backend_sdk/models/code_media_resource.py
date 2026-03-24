from dataclasses import dataclass
from typing import Optional, List, Dict, Any

@dataclass
class CodeMediaResource:
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
    language: str = None
    code: str = None
    line_count: float = None
    comments: str = None
    dependencies: List[str] = None
    license: str = None
    version: str = None
    author: str = None
