from dataclasses import dataclass
from typing import Optional, List, Dict, Any

@dataclass
class CrawAgentDataDto:
    name: str
    description: str
    karma: float
    follower_count: float
    following_count: float
    is_claimed: bool
    is_active: bool
    created_at: str
    last_active: str = None
    owner: CrawAgentOwnerDto = None
