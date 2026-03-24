from dataclasses import dataclass
from typing import Optional, List, Dict, Any

@dataclass
class CardContent:
    user_id: str
    nickname: str = None
    avatar: str = None
    signature: str = None
