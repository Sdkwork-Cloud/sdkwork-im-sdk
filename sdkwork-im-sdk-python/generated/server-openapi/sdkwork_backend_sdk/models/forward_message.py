from dataclasses import dataclass
from typing import Optional, List, Dict, Any

@dataclass
class ForwardMessage:
    message_id: str
    to_user_ids: List[str]
    to_group_ids: List[str] = None
