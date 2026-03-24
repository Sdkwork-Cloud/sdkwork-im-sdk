from dataclasses import dataclass
from typing import Optional, List, Dict, Any

@dataclass
class RegisterDto:
    username: str
    password: str
    nickname: str
    email: str = None
    phone: str = None
    code: str
