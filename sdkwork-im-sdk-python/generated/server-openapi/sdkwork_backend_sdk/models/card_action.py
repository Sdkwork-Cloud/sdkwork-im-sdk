from dataclasses import dataclass
from typing import Optional, List, Dict, Any

@dataclass
class CardAction:
    type: str
    url: str = None
    params: Dict[str, Any] = None
    app_id: str = None
    app_path: str = None
