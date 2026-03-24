from dataclasses import dataclass
from typing import Optional, List, Dict, Any

@dataclass
class FriendControllerSendRequestResponse400:
    code: float = None
    message: str = None
    timestamp: float = None
    request_id: str = None
