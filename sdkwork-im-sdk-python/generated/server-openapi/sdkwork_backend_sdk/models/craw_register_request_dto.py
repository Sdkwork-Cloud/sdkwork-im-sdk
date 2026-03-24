from dataclasses import dataclass
from typing import Optional, List, Dict, Any

@dataclass
class CrawRegisterRequestDto:
    name: str
    description: str = None
