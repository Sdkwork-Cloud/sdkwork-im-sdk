from dataclasses import dataclass
from typing import Optional, List, Dict, Any

@dataclass
class EditMessage:
    content: MessageContent
    extra: Dict[str, Any] = None
