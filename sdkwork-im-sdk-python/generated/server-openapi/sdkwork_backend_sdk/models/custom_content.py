from dataclasses import dataclass
from typing import Optional, List, Dict, Any

@dataclass
class CustomContent:
    custom_type: str
    data: Dict[str, Any] = None
