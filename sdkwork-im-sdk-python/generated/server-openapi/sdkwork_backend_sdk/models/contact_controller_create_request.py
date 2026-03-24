from dataclasses import dataclass
from typing import Optional, List, Dict, Any

@dataclass
class ContactControllerCreateRequest:
    user_id: str
    contact_id: str
    type: str
    name: str
    remark: str = None
    tags: List[str] = None
