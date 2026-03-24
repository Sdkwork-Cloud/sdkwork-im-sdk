from dataclasses import dataclass
from typing import Optional, List, Dict, Any

@dataclass
class CrawAgentOwnerDto:
    x_handle: str = None
    x_name: str = None
    x_avatar: str = None
    x_bio: str = None
    x_follower_count: float = None
    x_following_count: float = None
    x_verified: bool = None
