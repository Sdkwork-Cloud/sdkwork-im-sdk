from dataclasses import dataclass
from typing import Optional, List, Dict, Any

@dataclass
class ToggleTimelineLikeDto:
    liked: bool = None
