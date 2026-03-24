from dataclasses import dataclass
from typing import Optional, List, Dict, Any

@dataclass
class AibotControllerCreateBotRequest:
    name: str
    description: str
    type: str
    config: Dict[str, Any] = None
    is_active: bool = None
