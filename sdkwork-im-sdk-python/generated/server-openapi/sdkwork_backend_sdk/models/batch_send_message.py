from dataclasses import dataclass
from typing import Optional, List, Dict, Any

@dataclass
class BatchSendMessage:
    messages: List[SendMessage]
