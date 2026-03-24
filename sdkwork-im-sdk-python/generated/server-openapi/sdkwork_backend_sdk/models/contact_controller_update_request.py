from dataclasses import dataclass
from typing import Optional, List, Dict, Any

@dataclass
class ContactControllerUpdateRequest:
    name: str = None
    remark: str = None
    tags: List[str] = None
    is_favorite: bool = None
    status: str = None
