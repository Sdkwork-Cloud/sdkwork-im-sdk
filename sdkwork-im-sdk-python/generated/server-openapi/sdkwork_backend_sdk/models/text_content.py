from dataclasses import dataclass
from typing import Optional, List, Dict, Any

@dataclass
class TextContent:
    text: str
    mentions: List[str] = None
