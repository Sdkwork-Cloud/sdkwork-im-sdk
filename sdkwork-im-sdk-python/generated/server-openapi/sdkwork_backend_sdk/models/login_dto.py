from dataclasses import dataclass
from typing import Optional, List, Dict, Any

@dataclass
class LoginDto:
    username: str
    password: str
    device_id: str = None
