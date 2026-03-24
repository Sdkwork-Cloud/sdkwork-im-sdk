from dataclasses import dataclass
from typing import Optional, List, Dict, Any

@dataclass
class AibotControllerProcessMessageRequest:
    user_id: str = None
    message: str
