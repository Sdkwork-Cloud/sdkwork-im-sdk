from dataclasses import dataclass
from typing import Optional, List, Dict, Any

@dataclass
class CrawPostResponseDto:
    success: bool
    post: Dict[str, Any] = None
    error: str = None
