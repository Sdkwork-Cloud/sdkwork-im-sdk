from dataclasses import dataclass
from typing import Optional, List, Dict, Any

@dataclass
class CardButton:
    text: str
    action: CardAction = None
    style: str = None
    color: str = None
