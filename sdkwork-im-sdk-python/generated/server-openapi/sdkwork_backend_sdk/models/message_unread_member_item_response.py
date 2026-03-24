from dataclasses import dataclass
from typing import Optional, List, Dict, Any

@dataclass
class MessageUnreadMemberItemResponse:
    user_id: str
    role: str
    receipt_status: str = None
    delivered_at: str = None
    read_at: str = None
