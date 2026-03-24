from dataclasses import dataclass
from typing import Optional, List, Dict, Any

@dataclass
class LogoutDto:
    token: str = None
    refresh_token: str = None
    device_id: str = None
