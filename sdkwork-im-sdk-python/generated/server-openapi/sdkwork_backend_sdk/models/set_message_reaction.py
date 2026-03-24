from dataclasses import dataclass
from typing import Optional, List, Dict, Any

@dataclass
class SetMessageReaction:
    emoji: str
    active: bool = None
