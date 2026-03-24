from dataclasses import dataclass
from typing import Optional, List, Dict, Any

@dataclass
class ConversationControllerCreateRequest:
    type: str
    target_id: str
