from dataclasses import dataclass
from typing import Optional, List, Dict, Any

@dataclass
class GroupControllerAddMemberRequest:
    user_id: str = None
    role: str = None
