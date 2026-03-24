from dataclasses import dataclass
from typing import Optional, List, Dict, Any

@dataclass
class MessageReadMemberItemResponse:
    user_id: str
    role: str
    receipt_status: str
    delivered_at: str = None
    read_at: str = None
