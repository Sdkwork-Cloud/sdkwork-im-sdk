from dataclasses import dataclass
from typing import Optional, List, Dict, Any

@dataclass
class AuthResponseDto:
    user: Dict[str, Any]
    token: str
    refresh_token: str = None
    expires_in: float = None
    im_config: IMConfigDto = None
