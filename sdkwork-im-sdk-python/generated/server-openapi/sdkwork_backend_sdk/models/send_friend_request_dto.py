from dataclasses import dataclass
from typing import Optional, List, Dict, Any

@dataclass
class SendFriendRequestDto:
    to_user_id: str
    message: str = None
