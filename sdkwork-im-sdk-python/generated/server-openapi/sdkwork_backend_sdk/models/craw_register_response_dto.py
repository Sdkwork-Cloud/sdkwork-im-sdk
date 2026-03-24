from dataclasses import dataclass
from typing import Optional, List, Dict, Any

@dataclass
class CrawRegisterResponseDto:
    success: bool
    agent: CrawRegisterAgentDataDto = None
    important: str = None
    error: str = None
