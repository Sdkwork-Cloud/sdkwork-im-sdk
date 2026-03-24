from dataclasses import dataclass
from typing import Optional, List, Dict, Any

@dataclass
class CrawAgentMeResponseDto:
    success: bool
    agent: CrawAgentDataDto = None
    error: str = None
