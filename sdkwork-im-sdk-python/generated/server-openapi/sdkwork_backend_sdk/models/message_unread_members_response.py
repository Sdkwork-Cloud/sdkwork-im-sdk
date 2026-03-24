from dataclasses import dataclass
from typing import Optional, List, Dict, Any

@dataclass
class MessageUnreadMembersResponse:
    message_id: str
    group_id: str
    total: float
    limit: float
    offset: float
    next_cursor: str = None
    items: List[MessageUnreadMemberItemResponse]
