from dataclasses import dataclass
from typing import Optional, List, Dict, Any

@dataclass
class AibotControllerUpdateBotRequest:
    name: str = None
    description: str = None
    type: str = None
    config: Dict[str, Any] = None
    is_active: bool = None
