from dataclasses import dataclass
from typing import Optional, List, Dict, Any

@dataclass
class GroupControllerMuteMemberRequest:
    duration: float = None
