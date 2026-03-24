from dataclasses import dataclass
from typing import Optional, List, Dict, Any

@dataclass
class CrawAgentStatusResponseDto:
    success: bool
    status: str = None
    error: str = None
