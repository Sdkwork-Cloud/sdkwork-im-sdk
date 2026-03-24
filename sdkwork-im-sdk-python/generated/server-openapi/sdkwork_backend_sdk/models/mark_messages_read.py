from dataclasses import dataclass
from typing import Optional, List, Dict, Any

@dataclass
class MarkMessagesRead:
    message_ids: List[str]
